import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { createReadStream, existsSync, mkdirSync, writeFileSync } from 'fs';
import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BookEntity } from './entities/book.entity';
import { normalizeFilename, uniquePath } from 'src/helpers';
import { BookUploadDto } from './dtos/booUpload.dto';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(BookEntity) private bookRepository: Repository<BookEntity>) {}

  uploadBook = async (file: Express.Multer.File, bookData: BookUploadDto, cover: Express.Multer.File | null, req: Request) => {
    const userId = req.user.id;
    if (!userId) throw new NotFoundException('User not found');

    const userDir = `public/uploads/${userId}`;
    if (!existsSync(userDir)) mkdirSync(userDir);

    try {
      const normalizedFilename = normalizeFilename(file.originalname);
      const bookFilePath = await uniquePath(`${userDir}/${normalizedFilename}`);

      let coverPath = null;
      if (cover) {
        const normalizedCoverFilename = normalizeFilename(cover.originalname);
        coverPath = uniquePath(`${userDir}/${normalizedCoverFilename}`);
        writeFileSync(coverPath, cover.buffer);
      }

      console.log('BOOKDATA', bookData);
      const book = {
        title: bookData.title || file.originalname,
        description: bookData.description,
        author: bookData.author,
        cover: coverPath,
        path: bookFilePath,
        user: { id: userId },
      };

      await this.bookRepository.save(book);
      writeFileSync(bookFilePath, file.buffer);

      return { message: 'File uploaded', path: bookFilePath };
    } catch (error) {
      console.log(error);
      // postgresql unique constraint violation
      if (error.code === '23505') throw new ConflictException('A book with the same data already exists.');
      throw new Error('Error uploading file');
    }
  };

  getBooks = async (request: Request) => {
    if (!request.user.id) throw new Error('User not found');

    try {
      const userBooks = this.bookRepository.find({
        where: { user: { id: request.user.id } },
        relations: ['user'],
      });
      return userBooks;
    } catch (error) {
      console.log(error);
      throw new Error('Error getting books');
    }
  };

  getBookById = async (bookId: string, request: Request, response: Response) => {
    if (!request.user.id) throw new UnauthorizedException('User not authenticated');
    if (!bookId) throw new BadRequestException('Book id not provided');

    const book = await this.bookRepository.findOne({ where: { id: bookId }, relations: ['user'] });
    if (!book) throw new NotFoundException('Book not found');

    try {
      // Check if the book belongs to the user
      if (book.user.id !== request.user.id) throw new UnauthorizedException('Unauthorized');
      // Check if path exists
      if (!existsSync(book.path)) throw new NotFoundException('Book path not found');

      // Create file url for access
      console.log('book', book);
      const basePath = book.path.startsWith('public') ? book.path.slice('public'.length) : book.path;
      const accessibleUrl = `${request.protocol}://${request.get('host')}${basePath}`;

      const bookData = { ...book, pdfUrl: accessibleUrl };
      console.log(bookData);

      return response.status(200).json(bookData);
    } catch (error) {
      throw new BadRequestException('Error during book fetching');
    }
  };

  updateBook = async () => {
    return 'Update book';
  };

  deleteBook = async () => {
    return 'Delete book';
  };
}

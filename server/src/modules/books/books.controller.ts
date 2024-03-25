import { Request, Response } from 'express';
import { Body, Controller, Get, Param, Post, Req, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';

import { BooksService } from './books.service';
import { AuthGuard } from '../auth/auth.guard';
import { BookUploadDto } from './dtos/booUpload.dto';

@UseGuards(AuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get('')
  @ApiOperation({ summary: 'Get books' })
  async getBooks(@Req() request: Request) {
    return this.bookService.getBooks(request);
  }

  @Get(':id')
  async getBookById(@Param('id') bookId: string, @Req() request: Request, @Res() response: Response) {
    return this.bookService.getBookById(bookId, request, response);
  }

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'cover', maxCount: 1 }, // Si esperas una imagen de portada
    ]),
  )
  async uploadBook(@UploadedFiles() files: { file?: Express.Multer.File[]; cover?: Express.Multer.File[] }, @Body() bookData: BookUploadDto, @Req() request: Request) {
    const fileProvided = files.file && files.file[0] ? files.file[0] : null;
    const coverProvided = files.cover && files.cover[0] ? files.cover[0] : null;

    if (!fileProvided) throw new Error('File not provided');

    return this.bookService.uploadBook(fileProvided, bookData, coverProvided, request);
  }
}

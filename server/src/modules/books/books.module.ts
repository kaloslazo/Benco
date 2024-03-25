import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BookEntity } from './entities/book.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([BookEntity])],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}

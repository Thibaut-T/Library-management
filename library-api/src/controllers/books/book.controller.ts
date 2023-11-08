import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import {
  BookPresenter,
  PlainBookPresenter,
} from 'library-api/src/controllers/books/book.presenter';
import { BookId, UserId } from 'library-api/src/entities';
import { bookToAdd } from 'library-api/src/models';
import { BookUseCases } from 'library-api/src/useCases';

@Controller('books')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @Get('/:userId')
  public async getAll(@Param('userId') userId: string): Promise<PlainBookPresenter[]> {
    console.log("userId: ", userId)
    const books = await this.bookUseCases.getAllPlain(userId);
    return books.map(PlainBookPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);

    return BookPresenter.from(book);
  }
  
  @Post('/:userId')
  public async addBook(@Body() newBook: bookToAdd, @Param('userId') userId: string): Promise<BookPresenter> {
    // Call your bookUseCases method to add the book to the database
    const book = await this.bookUseCases.addBook(newBook, userId);
    return BookPresenter.from(book);
  }

  @Delete('/:userId/:id')
  public async deleteBook(@Param('id') id: BookId, @Param('userId') userId: UserId): Promise<BookPresenter> {
    // Call your bookUseCases method to delete the book from the database
    console.log("book to delete: ", id, "from user: ", userId)
    const book = await this.bookUseCases.deleteBook(id, userId);
    return BookPresenter.from(book);
  }
}

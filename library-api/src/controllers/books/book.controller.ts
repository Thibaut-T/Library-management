import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import {
  BookPresenter,
} from '../../controllers/books/book.presenter';
import { BookId, UserId } from '../../entities';
import { bookToAdd } from '../../models';
import { BookUseCases } from '../../useCases';

@Controller('books')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @Get('/:userId')
  public async getAll(@Param('userId') userId: string): Promise<BookPresenter[]> {
    const books = await this.bookUseCases.getAllPlain(userId);
    const booksToSend = books.map(BookPresenter.from);
    return booksToSend;
  }

  @Get('/user/:id')
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
    const book = await this.bookUseCases.deleteBook(id, userId);
    return BookPresenter.from(book);
  }
}

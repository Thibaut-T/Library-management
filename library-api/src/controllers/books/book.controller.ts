import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import {
  BookPresenter,
  PlainBookPresenter,
} from './book.presenter';
import { BookId } from '../../entities';
import { bookToAdd } from '../../models';
import { BookUseCases } from '../../useCases';

@Controller('books')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainBookPresenter[]> {
    const books = await this.bookUseCases.getAllPlain();
    return books.map(PlainBookPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);

    return BookPresenter.from(book);
  }
  
  @Post('/')
  public async addBook(@Body() newBook: bookToAdd): Promise<BookPresenter> {
    // Call your bookUseCases method to add the book to the database
    const book = await this.bookUseCases.addBook(newBook);
    return BookPresenter.from(book);
  }

  @Delete('/:id')
  public async deleteBook(@Param('id') id: BookId): Promise<BookPresenter> {
    // Call your bookUseCases method to delete the book from the database
    console.log("book to delete: ", id)
    const book = await this.bookUseCases.deleteBook(id);
    return BookPresenter.from(book);
  }
}

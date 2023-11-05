import { Injectable } from '@nestjs/common';
import { BookPresenter } from 'library-api/src/controllers/books/book.presenter';
import { BookId } from 'library-api/src/entities';
import { bookToAdd, AuthorModel} from 'library-api/src/models';
import { BookRepository, AuthorRepository, BookGenreRepository } from 'library-api/src/repositories';
import { AuthorUseCases } from 'library-api/src/useCases/authors/author.useCases';
import {
  BookUseCasesOutput,
  PlainBookUseCasesOutput,
} from 'library-api/src/useCases/books/book.useCases.type';

@Injectable()
export class BookUseCases {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly authorRepository: AuthorRepository,
    private readonly bookGenreRepository: BookGenreRepository,
    ) {}

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookUseCasesOutput[]> {
    return this.bookRepository.getAllPlain();
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookUseCasesOutput> {
    return this.bookRepository.getById(id);
  }

  /**
   * Add a book to the database
   * @param data Book's data
   * @returns Book's ID
   * @throws 400: book's data is invalid
   */
  public async addBook(newBook: bookToAdd): Promise<BookUseCasesOutput> {
    console.log("book received: ", newBook);
    if (!newBook.name) {
      throw new Error('Book name is required');
    }
    if (!newBook.author) {
      throw new Error('Book author is required');
    }
    if(!newBook.writtenOn) {
      newBook.writtenOn = new Date();
    }
    if(!newBook.genreId) {
      throw new Error('Book genre is required');
    }
    //console.log("book received: ", newBook);
    const author = await this.authorRepository.addAuthor(newBook.author);
    //console.log("author: ", author);
    const book = await this.bookRepository.createBook(newBook, author);
    const bookToModify = await this.bookRepository.getBookTypeById(book.id);
    const bookModified = await this.bookGenreRepository.createBookGenre(bookToModify, newBook.genreId);
    return book;
  }

  /**
   * Delete a book from the database
   * @param id Book's ID
   * @returns Book's ID
   * @throws 404: book with this ID was not found
   */
  public async deleteBook(id: BookId): Promise<BookUseCasesOutput> {
    return this.bookRepository.deleteBook(id);
  }
}

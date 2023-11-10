import { Injectable } from '@nestjs/common';
import { ca } from 'date-fns/locale';
import { BookPresenter } from 'library-api/src/controllers/books/book.presenter';
import { BookId, UserId } from 'library-api/src/entities';
import { bookToAdd, AuthorModel} from 'library-api/src/models';
import { BookRepository, AuthorRepository, BookGenreRepository } from 'library-api/src/repositories';
import { AuthorUseCases } from 'library-api/src/useCases/authors/author.useCases';
import {
  BookUseCasesOutput,
  PlainBookUseCasesOutput,
} from '../../useCases/books/book.useCases.type';

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
  public async getAllPlain(userId: string): Promise<BookUseCasesOutput[]> {
    return this.bookRepository.getAllPlain(userId);
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
  public async addBook(newBook: bookToAdd, userId: string): Promise<BookUseCasesOutput> {
    console.log("book received: ", newBook, "from user: ", userId);
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
    
    const author = await this.authorRepository.addAuthor(newBook.author);
   
    const book = await this.bookRepository.createBook(newBook, author, userId);
    const bookToModify = await this.bookRepository.getBookTypeById(book.id);
    (bookToModify.bookGenres[0] == null) ? await this.bookGenreRepository.createBookGenre(bookToModify, newBook.genreId): null;
    await this.bookRepository.updateBookOwners(bookToModify.id, userId);

    return book;
  }

  /**
   * Delete a book from the database
   * @param id Book's ID
   * @returns Book's ID
   * @throws 404: book with this ID was not found
   */
  public async deleteBook(id: BookId, userId: UserId): Promise<BookUseCasesOutput> {
    return this.bookRepository.deleteBook(id, userId);
  }
}

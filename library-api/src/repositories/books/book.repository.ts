import { Injectable } from '@nestjs/common';
import { NotFoundError, BadRequestError } from 'library-api/src/common/errors';
import { Book, BookId} from 'library-api/src/entities';
import { bookToAdd, AuthorModel} from 'library-api/src/models';
import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
} from 'library-api/src/repositories/books/book.repository.type';
import {
  adaptBookEntityToBookModel,
  adaptBookEntityToPlainBookModel,
  createBookUtils
} from 'library-api/src/repositories/books/book.utils';

import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(public readonly dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookRepositoryOutput[]> {
    const books = await this.find({
      relations: { bookGenres: { genre: true }, author: true },
    });
    return books.map(adaptBookEntityToPlainBookModel);
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookRepositoryOutput> {
    const book = await this.findOne({ where: { id },
      relations: { bookGenres: { genre: true }, author: true }});

    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    return adaptBookEntityToBookModel(book);
  }

  public async getBookTypeById(id: BookId): Promise<Book> {
    const book = await this.findOne({ where: { id },
      relations: { bookGenres: { genre: true }, author: true }});

    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    return book;
  }
  /**
   * Add a book to the database
   * @param data Book's data
   * @returns Book's ID
   * @throws 400: book's data is invalid or the book already exists
   */

  public async createBook(newBook: bookToAdd, author: AuthorModel): Promise<BookRepositoryOutput> {

    console.log("book received: ", newBook);
    console.log("authorId received: ", author);

    const book = await createBookUtils(newBook, author);

    console.log("book to add: ", book);

    const bookExists = await this.findOne({ where: { name: book.name}, relations: { bookGenres: { genre: true }, author: true }});
    console.log("book exists: ", bookExists);

    if (bookExists && (bookExists.author.id === book.author.id)) {
      throw new BadRequestError(`Book already exists - '${bookExists.id}'`);

    } else {
      await this.save(book);
      console.log("book saved: ", book.id);
      
      const bookToAddGenre = await this.findOne({ where: { name: book.name}, relations: { bookGenres: { genre: true }, author: true }});
      //const updatedBook = await this.bookGenreRepository.createBookGenre(bookToAddGenre, newBook.genreId);
      //console.log("book updated: ", updatedBook);
    }
    return book;
  }

  /**
   * Update a book
   * @param id Book's ID
   * @param data Book's data
   * @returns Book's ID
   * @throws 400: book's data is invalid
   * @throws 404: book with this ID was not found
   */
  public async updateBook(id: BookId, data: Partial<Book>): Promise<BookId> {
    const book = await this.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    const updatedBook = await this.save({ ...book, ...data });
    return updatedBook.id;
  }
}

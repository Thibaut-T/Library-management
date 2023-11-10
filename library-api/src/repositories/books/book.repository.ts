import { Injectable } from '@nestjs/common';
import { NotFoundError, BadRequestError } from '../../common/errors';
import { Book, BookId, UserId} from '../../entities';
import { bookToAdd, AuthorModel} from '../../models';
import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
} from '../../repositories/books/book.repository.type';
import {
  adaptBookEntityToBookModel,
  adaptBookEntityToPlainBookModel,
  createBookUtils
} from '../../repositories/books/book.utils';
import { UserRepository } from '../users/user.repository';
import { AuthorRepository } from '../authors/author.repository';
import { BookGenreRepository } from '../bookGenres/bookGenre.repository';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(public readonly dataSource: DataSource,
    private readonly userRepository: UserRepository,) {
    super(Book, dataSource.createEntityManager());
  }

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(userId: string): Promise<BookRepositoryOutput[]> {
    const books = await this.find({
      relations: { bookGenres: { genre: true }, author: true, owners: true},
    });
    if (userId === "none"){
      return books.map(adaptBookEntityToBookModel);
    }
    const filteredBooks = books.filter((book) => {

      const ownersWithUserId = book.owners.filter((owner) => owner.id == userId);
      
      return ownersWithUserId.length > 0; 
    });
    
    return filteredBooks.map(adaptBookEntityToBookModel);
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookRepositoryOutput> {
    const book = await this.findOne({ where: { id: id },
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

  public async createBook(newBook: bookToAdd, author: AuthorModel, userId: string): Promise<BookRepositoryOutput> {

    const book = await createBookUtils(newBook, author);

    const bookExists = await this.findOne({ where: { name: book.name}, relations: { bookGenres: { genre: true }, author: true }});
    if (bookExists && (bookExists.author.id === book.author.id)) {
      const updatedBook = await this.updateBookOwners(bookExists.id, userId);
      const bookToReturn = await this.findOne({ where: { id: updatedBook }, relations: { bookGenres: { genre: true }, author: true }});
      return (adaptBookEntityToBookModel(bookToReturn));

    } else {
      await this.save(book);
      const bookToAddGenre = await this.findOne({ where: { name: book.name}, relations: { bookGenres: { genre: true }, author: true }});
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
  public async updateBookOwners(id: BookId, userId: string): Promise<BookId> {
    const book = await this.findOne({ where: { id },
      relations: {owners: true }});
    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }
    const userIdToFInd = userId as UserId;
    const owner = await this.userRepository.findOne({ where: { id: userIdToFInd } });
    book.owners.push(owner);
    const updatedBook = await this.save(book);
    return updatedBook.id;
  }

  /**
   * Delete a book from the database
   * @param id Book's ID
   * @returns Book's ID
   * @throws 404: book with this ID was not found
   */
  public async deleteBook(id: BookId, userId: UserId): Promise<BookRepositoryOutput> {
    const book = await this.findOne({ where: { id }, relations: { bookGenres: { genre: true }, author: true, owners: true }});

    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }
    const ownerIndex = book.owners.findIndex(owner => owner.id === userId);
    if (ownerIndex !== -1) {
      book.owners.splice(ownerIndex, 1);
    }
    await this.save(book);
    const deletedBook = adaptBookEntityToBookModel(book)
    return deletedBook ;
  }
}

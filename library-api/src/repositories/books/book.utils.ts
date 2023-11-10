import { Book,Author} from 'library-api/src/entities';
import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
} from 'library-api/src/repositories/books/book.repository.type';


import { bookToAdd, AuthorModel } from 'library-api/src/models';

export function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day); // Month is 0-based in JavaScript Date object
}

export const adaptBookEntityToPlainBookModel = (
  book: Book,
): PlainBookRepositoryOutput => ({
  ...book,
  genres: book.bookGenres.map((bookGenre) => bookGenre.genre.name),
});

export const adaptBookEntityToBookModel = (
  book: Book,
): BookRepositoryOutput => ({
  ...book,
  genres: book.bookGenres.map((bookGenre) => bookGenre.genre),
});

export const createBookUtils = (
  newBook: bookToAdd,
  author: AuthorModel,): Promise<BookRepositoryOutput> => {
  const book = new Book();
  book.name = newBook.name;
  book.author = author as Author;
  (newBook.writtenOn) ? book.writtenOn = newBook.writtenOn : book.writtenOn = new Date();
  book.bookGenres = [];
  return Promise.resolve(adaptBookEntityToBookModel(book));
};



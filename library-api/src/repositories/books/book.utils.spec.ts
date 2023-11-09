import { parseDate, adaptBookEntityToPlainBookModel, adaptBookEntityToBookModel, createBookUtils,} from './book.utils';
import { Book, Author } from '../../entities';
import { bookToAdd, AuthorModel } from '../../models';
import { BookId, AuthorId, GenreId } from '../../entities';

  const auteur1: Author = {
    id: '123' as AuthorId,
    firstName: 'J.R.R.',
    lastName: 'Tolkien',
    photoUrl: 'http://example.com/jrr-tolkien.jpg',
    books: [],
    hasId: () => true,
    remove: () => Promise.resolve(this),
    softRemove: () => Promise.resolve(this),
    recover: () => Promise.resolve(this),
    reload: () => Promise.resolve(this),
    save: () => Promise.resolve(this),
  };
  const book: Book = {
    id: '123' as BookId,
    name: 'The Hobbit',
    writtenOn: new Date(),
    author: auteur1,
    bookGenres: [],
    hasId: () => true,
    remove: () => Promise.resolve(this),
    softRemove: () => Promise.resolve(this),
    recover: () => Promise.resolve(this),
    reload: () => Promise.resolve(this),
    save: () => Promise.resolve(this),
  };

  const newBook: bookToAdd = {
    name: 'The Hobbit',
    writtenOn: new Date(),
    author: '123',
    genreId: '456' as GenreId,
  };

  const book2 = {
    id: '123' as BookId,
    name: 'The Hobbit',
    writtenOn: new Date(),
    author: auteur1,
    bookGenres: [],
    genres: [],
    hasId: () => true,
    remove: () => Promise.resolve(this),
    softRemove: () => Promise.resolve(this),
    recover: () => Promise.resolve(this),
    reload: () => Promise.resolve(this),
    save: () => Promise.resolve(this),
  };

  const author: AuthorModel = {
    id: '123' as AuthorId,
    firstName: 'J.R.R.',
    lastName: 'Tolkien',
    photoUrl: 'http://example.com/jrr-tolkien.jpg',
    books: [],
  };

  describe('Book Utils', () => {
    describe('parseDate', () => {
      it('should parse a date string', () => {
        const dateString = '31/01/2023';
        const result = parseDate(dateString);
        expect(result).toEqual(new Date(2023, 0, 31)); 
      });
    });
  
    describe('adaptBookEntityToPlainBookModel', () => {
      it('should adapt a Book entity to a PlainBookModel', () => {

        const result = adaptBookEntityToPlainBookModel(book);
  
        expect(result).toEqual(book2);
      });
    });
  
    describe('adaptBookEntityToBookModel', () => {
      it('should adapt a Book entity to a BookModel', () => {

        const result = adaptBookEntityToBookModel(book);

        expect(result).toEqual(book2);
      });
    });
  
    describe('createBookUtils', () => {
      it('should create a Book using provided data', async () => {

        const result = await createBookUtils(newBook, author);
  
        expect(result).toEqual(book2);
      });
    });
  });
import { PlainBookPresenter, BookPresenter } from './book.presenter';
import { AuthorId, BookId, GenreId, Author } from '../../entities';
import { BookModel, GenreModel } from '../../models';

const bookId1: BookId = "123" as BookId;
const autheurId1: AuthorId = 'John Doe' as AuthorId;
const genreId1: GenreId = 'Fantasy' as GenreId;
const genreId2: GenreId = 'Mystery' as GenreId;

// Mock data for testing
const plainBookData = {
  id: bookId1,
  name: 'Sample Book',
  writtenOn: new Date(),
  author: {
    id: autheurId1,
    firstName: 'John',
    lastName: 'Doe',
  },
  genres: ['Fantasy', 'Mystery'],
};

const auteur1: Author = {
  id: autheurId1,
  firstName: 'John',
  lastName: 'Doe',
  photoUrl: 'http://example.com/john-doe.jpg',
  books: [],
  hasId: () => true,
  remove: () => Promise.resolve(this),
  softRemove: () => Promise.resolve(this),
  recover: () => Promise.resolve(this),
  reload: () => Promise.resolve(this),
  save: () => Promise.resolve(this),
};

const genreData1: GenreModel = {
  id: genreId1,
  name: 'Fantasy',
};

const genreData2: GenreModel = {
  id: genreId2,
  name: 'Mystery',
};

const bookData: BookModel = {
  id: bookId1,
  name: 'Sample Book',
  writtenOn: new Date(),
  author: auteur1,
  genres: [
    genreData1, genreData2,
  ],
};

describe('PlainBookPresenter', () => {
  it('should create a PlainBookPresenter instance from PlainBookModel', () => {
    const plainBookPresenter = PlainBookPresenter.from(plainBookData);

    expect(plainBookPresenter).toBeInstanceOf(PlainBookPresenter);
    expect(plainBookPresenter.id).toBe('123');
    expect(plainBookPresenter.name).toBe('Sample Book');
  });
});

describe('BookPresenter', () => {
  it('should create a BookPresenter instance from BookModel', () => {
    const bookPresenter = BookPresenter.from(bookData);

    expect(bookPresenter).toBeInstanceOf(BookPresenter);
    expect(bookPresenter.id).toBe('123');
    expect(bookPresenter.name).toBe('Sample Book');
  });
});

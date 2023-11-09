import { Test, TestingModule } from '@nestjs/testing';
import { BookRepository } from './book.repository';
import { DataSource } from 'typeorm';
import { NotFoundError, BadRequestError } from '../../common/errors';
import { bookToAdd, AuthorModel, BookModel } from '../../models';
import { GenreId, AuthorId, BookId, Book, Author } from '../../entities';

class MockDataSource {
  createEntityManager() {
  }
}

describe('BookRepository', () => {
  let bookRepository: BookRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DataSource,
          useClass: MockDataSource,
        },
        BookRepository
      ],
    }).compile();

    bookRepository = module.get<BookRepository>(BookRepository);
  });

  const newBook: bookToAdd = {
    name: 'The Hobbit',
    writtenOn: new Date(),
    author: '123',
    genreId: '456' as GenreId,
  };
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
  const author: AuthorModel = {
    id: '123' as AuthorId,
    firstName: 'J.R.R.',
    lastName: 'Tolkien',
    photoUrl: 'http://example.com/jrr-tolkien.jpg',
    books: [],
  };
  const book1 = {
    id: '123' as BookId,
    name: 'The Hobbit',
    writtenOn: new Date(),
    author: auteur1,
    books: [],
    genres: [],
    bookGenres: [],
    hasId: () => true,
    remove: () => Promise.resolve(this),
    softRemove: () => Promise.resolve(this),
    recover: () => Promise.resolve(this),
    reload: () => Promise.resolve(this),
    save: () => Promise.resolve(this),
  };
  const book2 = {
    book: book,
  };

  describe('little functions', () => {
    it('should throw NotFoundError if book not found by ID in getById', async () => {
  
      jest.spyOn(bookRepository, 'findOne').mockResolvedValueOnce(null);
  
      await expect(bookRepository.getById('789' as BookId)).rejects.toThrowError(NotFoundError);
    });
    it('should get a book by ID in getBookTypeById', async () => {
      const mockBook = { id: '123' as BookId, title: 'Example Book' };
  
      jest.spyOn(bookRepository, 'findOne').mockResolvedValueOnce(mockBook as any);
  
      const result = await bookRepository.getBookTypeById('123' as BookId);
  
      expect(result).toEqual(mockBook);
    });

    it('should throw NotFoundError if book not found by ID in getBookTypeById', async () => {

      jest.spyOn(bookRepository, 'findOne').mockResolvedValueOnce(null);
  
      await expect(bookRepository.getBookTypeById('789' as  BookId)).rejects.toThrowError(NotFoundError);
    });
  });

  
  describe('createBook', () => {
    /*
    it('should create a book', async () => {

      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(bookRepository, 'save').mockResolvedValueOnce(book);

      const result = await bookRepository.createBook(newBook, author);

      expect(result).toEqual(book2);
    });
    */
    it('should throw a BadRequestError if the book already exists', async () => {

      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(book);

      await expect(bookRepository.createBook(newBook, author)).rejects.toThrowError(BadRequestError);
    });
  });

  describe('updateBook', () => {
    it('should update a book', async () => {
      const bookId = '123' as BookId;

      jest.spyOn(bookRepository, 'findOne').mockResolvedValueOnce(book1);

      jest.spyOn(bookRepository, 'save').mockResolvedValueOnce(book1);
      
      const result = await bookRepository.updateBook(bookId, book1);

      expect(result).toEqual(bookId);
      expect(bookRepository.findOne).toHaveBeenCalledWith({ where: { id: bookId } });
    });
    it('should throw NotFoundError if book not found during update', async () => {
  
      jest.spyOn(bookRepository, 'findOne').mockResolvedValueOnce(null);
  
      await expect(bookRepository.updateBook('789' as BookId, book1)).rejects.toThrowError(NotFoundError);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book', async () => {

    jest.spyOn(bookRepository, 'findOne').mockResolvedValueOnce(book1);

    jest.spyOn(bookRepository, 'remove').mockResolvedValueOnce(book1);

    const deletedBook = await bookRepository.deleteBook('123' as BookId);

    expect(deletedBook.id).toEqual('123' as BookId);
    });
    it('should throw NotFoundError if book not found during deletion', async () => {

      jest.spyOn(bookRepository, 'findOne').mockResolvedValueOnce(null);
  
      await expect(bookRepository.deleteBook('789' as BookId)).rejects.toThrowError(NotFoundError);
    });
  });
});
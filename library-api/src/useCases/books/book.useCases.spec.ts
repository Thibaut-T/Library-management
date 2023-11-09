import { BookUseCases } from './book.useCases';
import { BookRepository, AuthorRepository, BookGenreRepository } from '../../repositories';
import { BookId, Genre, GenreId, AuthorId } from '../../entities';
import { AuthorModel } from '../../models';
import { createBookUtils } from '../../repositories/books/book.utils';
describe('BookUseCases', () => {
  describe('getAllPlain', () => {
    it('should call repository function', async () => {
          const repository1 = { getAllPlain: jest.fn() } as unknown as BookRepository;
          const repository2 = { getAllPlain: jest.fn() } as unknown as AuthorRepository;
          const repository3 = { getAllPlain: jest.fn() } as unknown as BookGenreRepository;
          const useCases = new BookUseCases(repository1, repository2, repository3);
    });
  });

  describe('getById', () => {
      it('should call repository function', async () => {
          const repository1 = { getById: jest.fn() } as unknown as BookId;
      });
  });
});


import { AuthorUseCases } from './author.useCases';
import { AuthorRepository } from '../../repositories';
import { AuthorModel }  from '../../models';
import { AuthorId } from '../../entities';
import { createAuthor } from '../../repositories/authors/author.utils';

describe('AuthorUseCases', () => {
    describe('getAllAuthors', () => {
      it('should call repository function', async () => {
            const repository = { getAllAuthors: jest.fn() } as unknown as AuthorRepository;
            const useCases = new AuthorUseCases(repository);
            const result = await useCases.getAllAuthors();

            const authorModel1: AuthorModel = {
                id: '123' as AuthorId,
                firstName: 'John',
                lastName: 'Doe',
                photoUrl: 'http://example.com/john-doe.jpg',
                books: [],
            };
        });
    });
    describe('addAuthor', () => {
        it('should add an author', async () => {
            const repository = { addAuthor: jest.fn() } as unknown as AuthorRepository;
            const useCases = new AuthorUseCases(repository);
            const fixture = createAuthor("John Doe");

            const addAuthorSpy = jest
                .spyOn(repository, 'addAuthor')
                .mockResolvedValue(fixture);

            const result = await useCases.addAuthor(fixture.id);

            expect(addAuthorSpy).toHaveBeenCalledTimes(1);
            expect(result).toStrictEqual(fixture);
          });
      });
});


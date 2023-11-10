import { Test, TestingModule } from '@nestjs/testing';
import { AuthorRepository } from './author.repository'; // Import your repository class
import { DataSource } from 'typeorm';
import { AuthorModel } from '../../models';
import { createAuthor } from '../../repositories/authors/author.utils';
import { BookId, Genre, GenreId, AuthorId, Author } from '../../entities';

const authorModel1: AuthorModel = {
  id: 'John Doe' as AuthorId,
  firstName: 'John',
  lastName: 'Doe',
  photoUrl: 'http://example.com/john-doe.jpg',
  books: [],
};

const auteur1: Author = {
    id: 'John Doe' as AuthorId,
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

describe('AuthorRepository', () => {
  let authorRepository: AuthorRepository;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorRepository,
        {
          provide: DataSource,
          useValue: {
            createEntityManager: jest.fn(),
          },
        },
      ],
    }).compile();

    authorRepository = module.get<AuthorRepository>(AuthorRepository);
  });

  it('should be defined', () => {
    expect(authorRepository).toBeDefined();
  });

  it('should add an author to the database', async () => {

  
    jest.spyOn(authorRepository, 'findOne').mockResolvedValue(auteur1);
  
    jest.spyOn(authorRepository, 'save').mockResolvedValue(auteur1);
  
    const result = await authorRepository.addAuthor(authorModel1);
  
    expect(result).toEqual(auteur1);
  });
  it('should add a new author to the database if it does not exist', async () => {

    authorRepository.findOne = jest.fn().mockResolvedValue(null);

    authorRepository.save = jest.fn().mockImplementation(async (author: AuthorModel) => {
      return author;
    });


    const result = await authorRepository.addAuthor(authorModel1);

    expect(authorRepository.findOne).toHaveBeenCalledWith({ where: { firstName: authorModel1.firstName, lastName: authorModel1.lastName } });
    expect(authorRepository.save).toHaveBeenCalledWith(authorModel1);
  });

  it('should get all authors', async () => {
    const auteur2: Author = {
        id: 'Sam Samy' as AuthorId,
        firstName: 'Sam',
        lastName: 'Samy',
        photoUrl: 'http://example.com/sam-samy.jpg',
        books: [],
        hasId: () => true,
        remove: () => Promise.resolve(this),
        softRemove: () => Promise.resolve(this),
        recover: () => Promise.resolve(this),
        reload: () => Promise.resolve(this),
        save: () => Promise.resolve(this),
      };

    const mockAuthors: Author[] = [
      auteur1,auteur2,
    ];
    jest.spyOn(authorRepository, 'find').mockResolvedValue(mockAuthors);

    const result = await authorRepository.getAllAuthors();

    expect(result).toEqual(mockAuthors);
  });
});
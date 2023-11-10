import { Test, TestingModule } from '@nestjs/testing';
import { GenreUseCases } from './genre.useCases';
import { GenreRepository } from '../../repositories';
import { GenreUseCasesOutput } from '../../useCases/genres/genre.useCases.type';
import { GenreId } from '../../entities';

describe('GenreUseCases', () => {
  let genreUseCases: GenreUseCases;

  // Create a mock GenreRepository
  const genreRepository = {
    getAllGenres: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenreUseCases,
        { provide: GenreRepository, useValue: genreRepository },
      ],
    }).compile();

    genreUseCases = module.get<GenreUseCases>(GenreUseCases);
  });

  it('should be defined', () => {
    expect(genreUseCases).toBeDefined();
  });

  describe('getAllGenres', () => {
    it('should return an array of genres', async () => {
      // Mock the behavior of the getAllGenres method
      const mockGenres: GenreUseCasesOutput[] = [
        { id: '123' as GenreId, name: 'Genre 1' },
        { id: '456' as GenreId, name: 'Genre 2' },
      ];
      genreRepository.getAllGenres.mockResolvedValue(mockGenres);

      const result = await genreUseCases.getAllGenres();

      expect(result).toEqual(mockGenres);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { GenreController } from './genre.controller';
import { GenrePresenter } from './genre.presenter';
import { GenreUseCases } from '../../useCases';
import { GenreId } from 'library-api/src/entities';

describe('GenreController', () => {
  let controller: GenreController;
  let genreUseCasesMock: jest.Mocked<GenreUseCases>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenreController],
      providers: [
        {
          provide: GenreUseCases,
          useValue: {
            getAllGenres: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GenreController>(GenreController);
    genreUseCasesMock = module.get(GenreUseCases) as jest.Mocked<GenreUseCases>;
  });

  describe('getAll', () => {
    it('should return an array of GenrePresenter', async () => {
      const mockGenres = [
        { id: '123' as GenreId, name: 'Action' },
        { id: '456' as GenreId, name: 'Drama' },
      ];

      genreUseCasesMock.getAllGenres.mockResolvedValue(mockGenres);

      const result = await controller.getAll();

      expect(result).toEqual(mockGenres.map(GenrePresenter.from));
    });
  });
});

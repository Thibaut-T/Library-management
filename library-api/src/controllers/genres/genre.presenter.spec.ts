import { GenrePresenter } from './genre.presenter';
import { GenreModel } from '../../models';
import { GenreId } from '../../entities/Genre';

const genreId1: GenreId = "123" as GenreId;
const genreId2: GenreId = "456" as GenreId;

describe('GenrePresenter', () => {
  it('should create an instance of GenrePresenter', () => {
    const genreModel: GenreModel = {
      id: genreId1,
      name: 'Science Fiction',
    };

    const genrePresenter = GenrePresenter.from(genreModel);

    expect(genrePresenter).toBeInstanceOf(GenrePresenter);
  });

  it('should correctly map GenreModel to GenrePresenter', () => {
    const genreModel: GenreModel = {
      id: genreId2,
      name: 'Mystery',
    };

    const genrePresenter = GenrePresenter.from(genreModel);

    expect(genrePresenter.id).toBe(genreModel.id);
    expect(genrePresenter.name).toBe(genreModel.name);
  });
});

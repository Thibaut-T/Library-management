import { adaptGenreEntityToGenreModel } from './genre.utils';
import { Genre, GenreId } from '../../entities';

describe('adaptGenreEntityToGenreModel', () => {
  it('should adapt a Genre entity to GenreRepositoryOutput', () => {
    
    const genreEntity: Genre = {
      id: '123' as GenreId,
      name: 'Science Fiction',
      bookGenres: [],
      hasId: () => true,
      remove: () => Promise.resolve(this),
      softRemove: () => Promise.resolve(this),
      recover: () => Promise.resolve(this),
      reload: () => Promise.resolve(this),
      save: () => Promise.resolve(this),
    };

    const adaptedGenre = adaptGenreEntityToGenreModel(genreEntity);

    expect(adaptedGenre).toEqual(genreEntity);
  });
});

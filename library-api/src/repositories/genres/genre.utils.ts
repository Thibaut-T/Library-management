import { Genre } from "library-api/src/entities";
import { GenreRepositoryOutput } from 'library-api/src/repositories/genres/genre.repository.type';

export const adaptGenreEntityToGenreModel = (
  genre: Genre,
): GenreRepositoryOutput => ({
  ...genre,
});
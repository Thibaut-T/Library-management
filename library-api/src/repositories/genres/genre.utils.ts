import { Genre } from "../../entities";
import { GenreRepositoryOutput } from '../../repositories/genres/genre.repository.type';

export const adaptGenreEntityToGenreModel = (
  genre: Genre,
): GenreRepositoryOutput => ({
  ...genre,
});
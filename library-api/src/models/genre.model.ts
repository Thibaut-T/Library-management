import { GenreId, User } from 'library-api/src/entities';

export type GenreModel = {
  id: GenreId;
  name: string;
  users?: User[];
};

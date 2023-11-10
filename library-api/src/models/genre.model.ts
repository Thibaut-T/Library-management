import { GenreId, User } from '../entities';

export type GenreModel = {
  id: GenreId;
  name: string;
  users?: User[];
};

import { Author, BookId, GenreId} from '../entities';
import { PlainAuthorModel } from '../models/author.model';
import { GenreModel } from '../models/genre.model';

export type PlainBookModel = {
  id: BookId;
  name: string;
  writtenOn: Date;
  author: PlainAuthorModel;
  genres: string[];
};

export type BookModel = {
  id: BookId;
  name: string;
  writtenOn: Date;
  author: Author;
  genres: GenreModel[];
};

export type bookToAdd = {
  name : string;
  writtenOn : Date;
  author : any;
  genreId : GenreId;
}
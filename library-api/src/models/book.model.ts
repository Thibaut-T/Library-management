import { Author, BookId, GenreId} from 'library-api/src/entities';
import { PlainAuthorModel } from 'library-api/src/models/author.model';
import { GenreModel } from 'library-api/src/models/genre.model';

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
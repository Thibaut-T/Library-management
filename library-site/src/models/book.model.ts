import { PlainAuthorModel } from "./author.model";
import { GenreModel } from "./genre.model";

export type PlainBookModel = {
  id: string;
  name: string;
  writtenOn: Date;
  author: PlainAuthorModel;
  genres: string[];
};

export type bookToAdd = {
  name : string;
  writtenOn : Date;
  author : string;
  genreId : string;
}

import { PlainAuthorModel } from "./author.model";

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
  genres : string[];
}

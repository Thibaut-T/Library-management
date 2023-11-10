import { Author, AuthorId, Book } from 'library-api/src/entities';

export type PlainAuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  photoUrl?: string;
};

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  photuUrl?: string;
  books?: Book[];
};

export type authorToAdd = {
  firstName: string;
  lastName: string;
};
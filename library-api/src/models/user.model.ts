import { BookId, User, UserId } from 'library-api/src/entities';

export type PlainUserModel = {
  id: UserId;
  username: string;
  friends?: string[];
  favoriteBook?: BookId;
  ownedBooks?: BookId[];
  favoriteGenres?: string[];
};

export type UserModel = {
    id: UserId;
    username: string;
    friends?: UserModel[];
};
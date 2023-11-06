import { BookId } from '../entities';
import { User, UserId } from '../entities/User';

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
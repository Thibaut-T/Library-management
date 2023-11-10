import { BookId, User, UserId, GenreId } from 'library-api/src/entities';

export type PlainUserModel = {
  id: UserId;
  userName: string;
  userLastName: string;
  friends?: string[];
  favoriteBook?: BookId;
  ownedBooks?: BookId[];
  favoriteGenres?: string[];
};

export type UserModel = {
    id: UserId;
    userName: string;
    userLastName: string;
    friends?: UserModel[];
};

export type UserUpdateModel = {
    id: UserId;
    userName?: string;
    userLastName?: string;
    newFavoriteGenre?: GenreId;
    newFavoriteBook?: BookId;
    newOwnedBook?: BookId;
};
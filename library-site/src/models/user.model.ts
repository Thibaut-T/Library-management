export type UserModel = {
    id: string;
    username: string;
    friends?: string[];
}
export type PlainUserModel = {
    id: string;
    username: string;
    friends?: string[];
    favoriteBook?: string;
    ownedBooks?: string[];
    favoriteGenres?: string[];
  };
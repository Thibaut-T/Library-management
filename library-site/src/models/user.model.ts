export type UserModel = {
    id: string;
    userName: string;
    userLastName: string;
    friends?: string[];
}

export type PlainUserModel = {
    id: string;
    userName: string;
    userLastName: string;
    friends?: string[];
    favoriteBook?: string;
    ownedBooks?: string[];
    favoriteGenres?: string[];
  };
import { User, UserId } from 'library-api/src/entities';
import { UserModel, PlainUserModel } from 'library-api/src/models';

export const adaptUserEntityToPlainUserModel = (
    user: User,
): PlainUserModel => ({
    ...user,
    ownedBooks: user.ownedBooks ? user.ownedBooks.map((book) => book.id): [],
    friends: user.friends ? user.friends.map((friend) => friend.userName + ' ' + friend.userLastName): [],
    favoriteGenres: user.favoriteGenres ? user.favoriteGenres.map((genre) => genre.id): [],
    favoriteBook: user.favoriteBook ? user.favoriteBook.id : null,
});
import { adaptUserEntityToPlainUserModel } from './user.utils';
import { BookId, GenreId, User, UserId } from '../../entities';
import { UserModel, PlainUserModel } from '../../models';

describe('adaptUserEntityToPlainUserModel function', () => {
    it('should adapt user entity to plain user model correctly', () => {

        const userTest:  User = {
            id: '123' as UserId,
            userName: 'John',
            userLastName: 'Doe',
            favoriteBook: null,
            ownedBooks: [],
            friends: [],
            favoriteGenres: [],
            comments: null,
            hasId: () => true,
            remove: () => Promise.resolve(this),
            softRemove: () => Promise.resolve(this),
            recover: () => Promise.resolve(this),
            reload: () => Promise.resolve(this),
            save: () => Promise.resolve(this),
        };

    const expectedPlainUserModel: User = {
        id: '123' as UserId,
        userName: 'John',
        userLastName: 'Doe',
        favoriteBook: null,
        ownedBooks: [],
        friends: [],
        favoriteGenres: [],
        comments: null,
        hasId: () => true,
        remove: () => Promise.resolve(this),
        softRemove: () => Promise.resolve(this),
        recover: () => Promise.resolve(this),
        reload: () => Promise.resolve(this),
        save: () => Promise.resolve(this),
    };

    const result = adaptUserEntityToPlainUserModel(userTest);
        expect(result.id).toEqual(expectedPlainUserModel.id);
        expect(result.userName).toEqual(expectedPlainUserModel.userName);
        expect(result.userLastName).toEqual(expectedPlainUserModel.userLastName);
        expect(result.favoriteBook).toEqual(expectedPlainUserModel.favoriteBook);
        expect(result.ownedBooks).toEqual(expectedPlainUserModel.ownedBooks);
        expect(result.friends).toEqual(expectedPlainUserModel.friends);
        expect(result.favoriteGenres).toEqual(expectedPlainUserModel.favoriteGenres);
        
    });


});
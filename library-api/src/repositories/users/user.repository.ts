import { Injectable } from '@nestjs/common';
import { User, UserId } from 'library-api/src/entities';
import { UserModel, PlainUserModel } from 'library-api/src/models';
import { DataSource, Repository } from 'typeorm';
import { adaptUserEntityToPlainUserModel } from 'library-api/src/repositories/users/user.utils';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(public readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    /**
     * Get all users from the database
     */
    public async getAllUsers(): Promise<PlainUserModel[]> {
        const users = await this.find({
            relations: { favoriteBook: true, ownedBooks: true, friends: true, favoriteGenres: true},
        });
        return users.map(adaptUserEntityToPlainUserModel);
    };

};
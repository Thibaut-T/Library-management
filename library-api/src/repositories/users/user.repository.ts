import { Injectable } from '@nestjs/common';
import { User, UserId } from 'library-api/src/entities';
import { UserModel, PlainUserModel } from 'library-api/src/models';
import { DataSource, Repository } from 'typeorm';
import { adaptUserEntityToPlainUserModel } from 'library-api/src/repositories/users/user.utils';
import { de } from 'date-fns/locale';

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

    /**
     * Get a user by its id
     * @param id The user id
     */
    public async getUserById(id: UserId): Promise<PlainUserModel> {
        const user = await this.findOne({ where: { id },
            relations: { favoriteBook: true, ownedBooks: true, friends: true, favoriteGenres: true},
        });
        return adaptUserEntityToPlainUserModel(user);
    };

    /**
     * Create a new user
     * @param user The user to create
     */
    public async createUser(user: UserModel): Promise<PlainUserModel> {
        const newUser = new User();
        newUser.username = user.username;
        await this.save(newUser);
        const addedUser = await this.findOne({ 
            where: { username: newUser.username},
            relations: { favoriteBook: true, ownedBooks: true, friends: true, favoriteGenres: true},
        })
        return adaptUserEntityToPlainUserModel(addedUser);
    }

    /**
     * Delete a user
     * @param id The user id
     */
    public async deleteUser(id: UserId): Promise<PlainUserModel> {
        const user = await this.findOne({ where: { id },
            relations: { favoriteBook: true, ownedBooks: true, friends: true, favoriteGenres: true},
        });
        if(!user) {
            throw new Error("User not found");
        }
        console.log("User to delete: ", user)
        const deletedUser = adaptUserEntityToPlainUserModel(user);
        await this.remove(user);
        return deletedUser;
        //LES AMIS BLOQUENT LA SUPPRESSION DE L'UTILISATEUR (FOREIGN KEY)
    };
};
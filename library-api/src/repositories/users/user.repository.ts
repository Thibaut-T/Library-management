import { Injectable } from '@nestjs/common';
import { User, UserId } from 'library-api/src/entities';
import { UserModel, PlainUserModel } from 'library-api/src/models';
import { CommentRepository } from 'library-api/src/repositories/comments/comment.repository';
import { DataSource, Repository } from 'typeorm';
import { adaptUserEntityToPlainUserModel } from 'library-api/src/repositories/users/user.utils';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(public readonly dataSource: DataSource,
        private readonly commentRepository: CommentRepository,) {
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
        newUser.userName = user.userName;
        newUser.userLastName = user.userLastName;
        await this.save(newUser);
        const addedUser = await this.findOne({ 
            where: { userName: newUser.userName},
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
        await Promise.all(user.friends.map(async (friend) => {
            const byeFriend = await this.findOne({ where: { id: friend.id },
                relations: { friends: true},
            });
            if (byeFriend && byeFriend.friends) {
                // Remove the user from the friend's friends list
                byeFriend.friends = byeFriend.friends.filter(f => f.id !== user.id);
                await this.save(byeFriend);
            }
        }));
        /*await Promise.all(user.comments.map(async (comment) => {
            try {
                // Remove the comment from the database
                await this.commentRepository.remove(comment[]);
            } catch (error) {
                // Handle the error, e.g., log it or throw a custom exception
                console.error(`Error deleting comment with id ${comment.id}: ${error.message}`);
                throw new Error(`Failed to delete comment with id ${comment.id}`);
            }
        }));*/
        user.ownedBooks = [];
        user.favoriteBook = null;
        user.favoriteGenres = [];
        const deletedUser = adaptUserEntityToPlainUserModel(user);
        await this.remove(user);
        return deletedUser;
        //LES COMMS BLOQUENT LA SUPPRESSION DE L'UTILISATEUR (FOREIGN KEY)
    };
};
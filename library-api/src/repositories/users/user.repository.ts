import { Injectable } from '@nestjs/common';
import { forwardRef, Inject } from '@nestjs/common';
import { User, UserId, GenreId } from '../../entities';
import { UserModel, PlainUserModel, UserUpdateModel } from '../../models';
import { CommentRepository } from '../comments/comment.repository';
import { BookRepository } from '../books/book.repository';
import { GenreRepository } from '../genres/genre.repository';
import { DataSource, Repository } from 'typeorm';
import { adaptUserEntityToPlainUserModel } from '../../repositories/users/user.utils';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(public readonly dataSource: DataSource,
        private readonly commentRepository: CommentRepository,
        @Inject(forwardRef(() => BookRepository))
        private readonly bookRepository: BookRepository,
        private readonly genreRepository: GenreRepository) {
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
        await Promise.all(user.favoriteGenres.map(async (genre) => {
            const byeGenre = await this.genreRepository.findOne({ where: { id: genre.id },
                relations: { users: true},
            });
            if (byeGenre && byeGenre.users) {
                // Remove the user from the genre's users list
                byeGenre.users = byeGenre.users.filter(u => u.id !== user.id);
                await this.genreRepository.save(byeGenre);
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
    };

    /**
     * Update a user
     * @param id The user id
     * @param user The user data to update
     */

    public async updateUser(id: UserId, user: UserUpdateModel): Promise<PlainUserModel> {
        const userToUpdate = await this.findOne({ where: { id },
            relations: { favoriteBook: true, ownedBooks: true, friends: true, favoriteGenres: true},
        });
        if(!userToUpdate) {
            throw new Error("User not found");
        }
        userToUpdate.userName = user.userName;
        userToUpdate.userLastName = user.userLastName;
        if(user.newFavoriteBook === "") {
            userToUpdate.favoriteBook = null;
        }
        if(user.newFavoriteBook) {
            const newFavoriteBook = await this.bookRepository.findOne({ where: {id: user.newFavoriteBook}});
            if (!newFavoriteBook) {
                throw new Error('New favorite book not found');
            }
            if(newFavoriteBook != userToUpdate.favoriteBook) {
                userToUpdate.favoriteBook = newFavoriteBook;
            }
        }
        if(user.newFavoriteGenre){
            const newFavoriteGenre = await this.genreRepository.findOne({ where: {id: user.newFavoriteGenre}});
            if (!newFavoriteGenre) {
                throw new Error('New favorite genre not found');
            }
            const checkFavoriteGenre = userToUpdate.favoriteGenres.find(genre => genre.id === newFavoriteGenre.id);
            if (!checkFavoriteGenre) {
                userToUpdate.favoriteGenres.push(newFavoriteGenre);
                await this.genreRepository.updateGenreUsers(newFavoriteGenre.id, userToUpdate);
            }
        }
        if(user.newOwnedBook) {
            const newOwnedBook = await this.bookRepository.findOne({ where: {id: user.newOwnedBook}});
            if(!newOwnedBook) {
                throw new Error('New owned book not found');
            }
            const checkOwnedBook = userToUpdate.ownedBooks.find(book => book.id === newOwnedBook.id);
            if (!checkOwnedBook) {
                userToUpdate.ownedBooks.push(newOwnedBook);
                await this.bookRepository.updateBookOwners(newOwnedBook.id, id);
            }
        }
        await this.save(userToUpdate)
        const updatedUser = await this.findOne({ where: { id },
            relations: { favoriteBook: true, ownedBooks: true, friends: true, favoriteGenres: true},
        });
        return adaptUserEntityToPlainUserModel(updatedUser);
    };

    /**
     * Add a friend to a user
     * @param id The user id
     * @param friend The friend to add
     */

    public async addFriend(id: UserId, friend: UserId): Promise<PlainUserModel> {
        const user = await this.findOne({ where: { id: id},
            relations: { favoriteBook: true, ownedBooks: true, friends: true, favoriteGenres: true},
        });
        if(!user) {
            throw new Error("User not found");
        }
        const friendToAdd = await this.findOne({ where: { id: friend },
            relations: { favoriteBook: true, ownedBooks: true, friends: true, favoriteGenres: true},
        });
        if(!friendToAdd) {
            throw new Error("Friend not found");
        }
        await user.friends.push(friendToAdd);
        await friendToAdd.friends.push(user);
        await this.save(user);
        await this.save(friendToAdd);
        return adaptUserEntityToPlainUserModel(user);
    };

    /**
     * Remove a friend from a user
     * @param id The user id
     * @param friend The friend to remove
     */
    public async deleteFriend(id: UserId, friend: UserId): Promise<PlainUserModel> {
        const user = await this.findOne({ where: { id: id},
            relations: { favoriteBook: true, ownedBooks: true, friends: true, favoriteGenres: true},
        });
        if(!user) {
            throw new Error("User not found");
        }
        const friendToRemove = await this.findOne({ where: { id: friend },
            relations: { favoriteBook: true, ownedBooks: true, friends: true, favoriteGenres: true},
        });
        if(!friendToRemove) {
            throw new Error("Friend not found");
        }
        user.friends = user.friends.filter(f => f.id !== friendToRemove.id);
        friendToRemove.friends = friendToRemove.friends.filter(f => f.id !== user.id);
        await this.save(user);
        await this.save(friendToRemove);
        return adaptUserEntityToPlainUserModel(user);
    };

    /**
     * Remove a favorite genre from a user
     * @param id The user id
     * @param genre The genre to remove
     */

    public async deleteFavoriteGenre(id: UserId, genreId: GenreId): Promise<PlainUserModel> {
        const user = await this.findOne({ where: { id: id},
            relations: { favoriteBook: true, ownedBooks: true, friends: true, favoriteGenres: true},
        });
        if(!user) {
            throw new Error("User not found");
        }
        const genreToRemove = await this.genreRepository.findOne({ where: { id: genreId },
            relations: { users: true},
        });
        if(!genreToRemove) {
            throw new Error("Genre not found");
        }
        user.favoriteGenres = user.favoriteGenres.filter(g => g.id !== genreToRemove.id);
        genreToRemove.users = genreToRemove.users.filter(u => u.id !== user.id);
        await this.save(user);
        await this.genreRepository.save(genreToRemove);
        return adaptUserEntityToPlainUserModel(user);
    }
};
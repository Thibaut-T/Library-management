import { Injectable } from "@nestjs/common";
import {UserId, GenreId } from "../../entities";
import { UserModel, PlainUserModel } from "../../models";
import { UserRepository } from "../../repositories/users/user.repository";

@Injectable()
export class UserUseCases {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    /**
     * Get all users
     */
    public async getAllUsers(): Promise<PlainUserModel[]> {
        return this.userRepository.getAllUsers();
    };

    public async getUserById(id: UserId): Promise<PlainUserModel> {
        return this.userRepository.getUserById(id);
    }

    public async createUser(user: UserModel): Promise<PlainUserModel> {
        return this.userRepository.createUser(user);
    }

    public async deleteUser(id: UserId): Promise<PlainUserModel> {
        return this.userRepository.deleteUser(id);
    }

    public async updateUser(id: UserId, user: PlainUserModel): Promise<PlainUserModel> {
        return this.userRepository.updateUser(id, user);
    }

    public async addFriend(id: UserId, friend: UserId): Promise<PlainUserModel> {
        return this.userRepository.addFriend(id, friend);
    }

    public async deleteFriend(id: UserId, friend: UserId): Promise<PlainUserModel> {
        return this.userRepository.deleteFriend(id, friend);
    }

    public async deleteFavoriteGenre(id: UserId, genre: GenreId): Promise<PlainUserModel> {
        return this.userRepository.deleteFavoriteGenre(id, genre);
    }
};
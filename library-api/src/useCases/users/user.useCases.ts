import { Injectable } from "@nestjs/common";
import { User, UserId } from "library-api/src/entities";
import { UserModel, PlainUserModel } from "library-api/src/models";
import { UserRepository } from "library-api/src/repositories/users/user.repository";

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
};
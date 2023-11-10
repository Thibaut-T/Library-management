import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { UserId, GenreId } from '../../entities';
import { PlainUserModel, UserModel } from '../../models';
import { UserUseCases } from '../../useCases/users/user.useCases';

@Controller('users')
export class UserController {
    constructor(private readonly userUseCases: UserUseCases) {}

    @Get('/')
    public async getAll(): Promise<PlainUserModel[]> {
        const users = await this.userUseCases.getAllUsers();
        return users;
    }

    @Get('/:id')
    public async getById(@Param('id') id: UserId): Promise<PlainUserModel> {
        const user = await this.userUseCases.getUserById(id);
        return user;
    }

    @Post('/')
    public async create(@Body() user: UserModel): Promise<PlainUserModel> {
        const newUser = await this.userUseCases.createUser(user);
        return newUser;
    }

    @Delete('/:id')
    public async delete(@Param('id') id: UserId): Promise<PlainUserModel> {
        const user = await this.userUseCases.deleteUser(id);
        return user;
    }

    @Put('/:id')
    public async update(@Param('id') id: UserId, @Body() user: PlainUserModel): Promise<PlainUserModel> {
        const updatedUser = await this.userUseCases.updateUser(id, user);
        return updatedUser;
    }

    @Post('/:id/friends/:friend')
    public async addFriend(@Param('id') id: UserId, @Param('friend') friend: UserId): Promise<PlainUserModel> {
        const updatedUser = await this.userUseCases.addFriend(id, friend);
        return updatedUser;
    }

    @Delete('/:id/friends/:friend')
    public async deleteFriend(@Param('id') id: UserId, @Param('friend') friend: UserId): Promise<PlainUserModel> {
        const updatedUser = await this.userUseCases.deleteFriend(id, friend);
        return updatedUser;
    }

    @Delete('/:id/favoriteGenres/:genre')
    public async deleteFavoriteGenre(@Param('id') id: UserId, @Param('genre') genre: GenreId): Promise<PlainUserModel> {
        const updatedUser = await this.userUseCases.deleteFavoriteGenre(id, genre);
        return updatedUser;
    }
}

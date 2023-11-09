import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { UserId } from 'library-api/src/entities';
import { PlainUserModel, UserModel } from 'library-api/src/models';
import { UserUseCases } from 'library-api/src/useCases/users/user.useCases';

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
        console.log("Username received: ", user);
        const newUser = await this.userUseCases.createUser(user);
        return newUser;
    }

    @Delete('/:id')
    public async delete(@Param('id') id: UserId): Promise<PlainUserModel> {
        console.log("User to delete: ", id)
        const user = await this.userUseCases.deleteUser(id);
        return user;
    }

    @Put('/:id')
    public async update(@Param('id') id: UserId, @Body() user: PlainUserModel): Promise<PlainUserModel> {
        console.log("User to update: ", id)
        const updatedUser = await this.userUseCases.updateUser(id, user);
        return updatedUser;
    }
}

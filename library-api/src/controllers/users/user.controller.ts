import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UserId } from 'library-api/src/entities';
import { PlainUserModel } from 'library-api/src/models';
import { UserUseCases } from 'library-api/src/useCases/users/user.useCases';

@Controller('users')
export class UserController {
    constructor(private readonly userUseCases: UserUseCases) {}

    @Get('/')
    public async getAll(): Promise<PlainUserModel[]> {
        const users = await this.userUseCases.getAllUsers();
        return users;
    }
}

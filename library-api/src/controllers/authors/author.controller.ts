import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthorUseCases } from '../../useCases/authors/author.useCases';
import { PlainAuthorPresenter } from '../../controllers/authors/author.presenter';
import { authorToAdd } from '../../models';

@Controller('authors')
export class AuthorController {
    constructor(private readonly authorUseCases: AuthorUseCases) {}

    @Get('/')
    public async getAll(): Promise<PlainAuthorPresenter[]> {
        const authors = await this.authorUseCases.getAllAuthors();
        return authors.map(PlainAuthorPresenter.from);
    }

    @Post('/')
    public async addAuthor(@Body() payload: {newAuthor: authorToAdd}): Promise<PlainAuthorPresenter> {
        // Call your authorUseCases method to add the author to the database
        const newAuthor = payload.newAuthor;
        const authorString = newAuthor.firstName + " " + newAuthor.lastName;
        const author = await this.authorUseCases.addAuthor(authorString);
        return PlainAuthorPresenter.from(author);
    }
}

import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AuthorUseCases } from 'library-api/src/useCases/authors/author.useCases';
import { PlainAuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { authorToAdd } from 'library-api/src/models';
import { AuthorId } from 'library-api/src/entities';

@Controller('authors')
export class AuthorController {
    constructor(private readonly authorUseCases: AuthorUseCases) {}

    @Get('/')
    public async getAll(): Promise<PlainAuthorPresenter[]> {
        const authors = await this.authorUseCases.getAllAuthors();
        return authors.map(PlainAuthorPresenter.from);
    }

    @Get('/:id')
    public async getOne(@Param('id') id: AuthorId): Promise<PlainAuthorPresenter> {
        const author = await this.authorUseCases.getAuthorById(id);
        const authorToSend = PlainAuthorPresenter.from(author);
        return authorToSend;
    }

    @Post('/')
    public async addAuthor(@Body() payload: {newAuthor: authorToAdd}): Promise<PlainAuthorPresenter> {
        // Call your authorUseCases method to add the author to the database
        const newAuthor = payload.newAuthor;
        const authorString = newAuthor.firstName + " " + newAuthor.lastName;
        const author = await this.authorUseCases.addAuthor(authorString);
        return PlainAuthorPresenter.from(author);
    }

    @Delete('/:id')
    public async deleteAuthor(@Param('id') id: AuthorId): Promise<void> {
        await this.authorUseCases.deleteAuthor(id);
    }

    @Put('/:id')
    public async updateAuthor(@Param('id') id: AuthorId, @Body() authorToUpdate: authorToAdd): Promise<PlainAuthorPresenter> {
        const authorToModify = authorToUpdate;
        const author = await this.authorUseCases.updateAuthor(id, authorToModify);
        return PlainAuthorPresenter.from(author);
    }
}

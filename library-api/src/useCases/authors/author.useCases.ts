import { Injectable } from '@nestjs/common';
import { AuthorRepository } from 'library-api/src/repositories';
import { AuthorModel, authorToAdd } from "library-api/src/models"
import { AuthorId } from 'library-api/src/entities';

@Injectable()
export class AuthorUseCases {
    constructor(private readonly AuthorRepository: AuthorRepository) {}
    /**
     * Add an author to the database
     */
    public async addAuthor(author: string | AuthorModel | authorToAdd): Promise<AuthorModel> {
        return this.AuthorRepository.addAuthor(author);
    }

    public async getAllAuthors(): Promise<AuthorModel[]> {
        return this.AuthorRepository.getAllAuthors();
    }

    public async getAuthorById(id: AuthorId): Promise<AuthorModel> {
        return this.AuthorRepository.getAuthorById(id);
    }

    public async deleteAuthor(id: AuthorId): Promise<void> {
        return this.AuthorRepository.deleteAuthor(id);
    }

    public async updateAuthor(id: AuthorId, author: authorToAdd): Promise<AuthorModel> {
        return this.AuthorRepository.updateAuthor(id, author);
    }
}

import { Injectable } from '@nestjs/common';
import { AuthorRepository } from 'library-api/src/repositories';
import { AuthorModel } from "library-api/src/models"
import { AuthorId } from 'library-api/src/entities';

@Injectable()
export class AuthorUseCases {
    constructor(private readonly AuthorRepository: AuthorRepository) {}
    /**
     * Add an author to the database
     */
    public async addAuthor(author: string | AuthorModel): Promise<AuthorModel> {
        return this.AuthorRepository.addAuthor(author);
    }

    public async getAllAuthors(): Promise<AuthorModel[]> {
        return this.AuthorRepository.getAllAuthors();
    }

}

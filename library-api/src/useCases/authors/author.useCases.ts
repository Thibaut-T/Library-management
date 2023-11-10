import { Injectable } from '@nestjs/common';
import { AuthorRepository } from '../../repositories';
import { AuthorModel, authorToAdd } from "../../models"
import { AuthorId } from '../../entities';

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

}

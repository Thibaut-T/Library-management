import { Injectable } from '@nestjs/common';
import { Author, AuthorId } from '../../entities';
import { AuthorModel, authorToAdd } from '../../models';
import { DataSource, Repository } from 'typeorm';
import { createAuthor } from '../../repositories/authors/author.utils';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(public readonly dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  /**
   * Add an author to the database
   */
  public async addAuthor(author: string | AuthorModel | authorToAdd): Promise<AuthorModel> {
    if(typeof author === "string") {
      author = createAuthor(author);
    }
    
    //check if author already exists
    const authorExists = await this.findOne({ where: { firstName: author.firstName, lastName: author.lastName } });

    if(!authorExists) {
      await this.save(author);
      const authorAdded = await this.findOne({ where: { firstName: author.firstName, lastName: author.lastName } });
      return authorAdded;
    }
    console.log("author: ", author);
    return authorExists;
  };

  /**
   * Get all authors
   */
  public async getAllAuthors(): Promise<AuthorModel[]> {
    const authors = await this.find();
    return authors; 
  };

  /**
   * Get an author by id
   */
  public async getAuthorById(id: AuthorId): Promise<AuthorModel> {
    const author = await this.findOne({ where: { id },
    relations: ['books']});
    return author;
  }

  /**
   * Delete an author
   */
  public async deleteAuthor(id: AuthorId): Promise<void> {
    await this.delete(id);
  }

  /**
   * Update an author
   */
  public async updateAuthor(id: AuthorId, author: authorToAdd): Promise<AuthorModel> {
    const updatedAuthor = await this.findOne({ where: { id: id },
    relations: ['books']});
    if(!updatedAuthor) {
      throw new Error(`Author with id ${id} not found`);
    }
    updatedAuthor.firstName = author.firstName;
    updatedAuthor.lastName = author.lastName;
    return await this.save(updatedAuthor);;
  };
}

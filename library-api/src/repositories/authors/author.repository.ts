import { Injectable } from '@nestjs/common';
import { Author, AuthorId } from '../../entities';
import { AuthorModel } from '../../models';
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
  public async addAuthor(author: string | AuthorModel): Promise<AuthorModel> {
    if(typeof author === "string") {
      author = createAuthor(author);
    }
    //check if author already exists
    const authorExists = await this.findOne({ where: { firstName: author.firstName, lastName: author.lastName } });

    if(!authorExists) {
      await this.save(author);
      author = await this.findOne({ where: { firstName: author.firstName, lastName: author.lastName } });
    }
    else {
      return authorExists;
    }
    console.log("author: ", author);
    return author;
  };

  /**
   * Get all authors
   */
  public async getAllAuthors(): Promise<AuthorModel[]> {
    const authors = await this.find();
    return authors; 
  };
}

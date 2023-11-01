import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { Genre } from 'library-api/src/entities';
import { GenreRepositoryOutput } from 'library-api/src/repositories/genres/genre.repository.type';
import { adaptGenreEntityToGenreModel } from 'library-api/src/repositories/genres/genre.utils';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor(public readonly dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }

  public async getAllGenres(): Promise<GenreRepositoryOutput[]> {
    const genres = await this.find();
    return genres.map(adaptGenreEntityToGenreModel);
  }
}

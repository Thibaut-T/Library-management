import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../../common/errors';
import { Genre } from '../../entities';
import { GenreRepositoryOutput } from '../../repositories/genres/genre.repository.type';
import { adaptGenreEntityToGenreModel } from '../../repositories/genres/genre.utils';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor(public readonly dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }

  public async getAllGenres(): Promise<GenreRepositoryOutput[]> {
    const genres = await this.find();
    console.log("genres: ", genres);
    return genres.map(adaptGenreEntityToGenreModel);
  }
}

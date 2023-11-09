import { Injectable } from '@nestjs/common';
import { Genre, User } from 'library-api/src/entities';
import { GenreRepositoryOutput } from 'library-api/src/repositories/genres/genre.repository.type';
import { adaptGenreEntityToGenreModel } from 'library-api/src/repositories/genres/genre.utils';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor(public readonly dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }

  public async getAllGenres(): Promise<GenreRepositoryOutput[]> {
    const genres = await this.find({
      relations: { users: true},
    });
    const adpatedGenres = genres.map(adaptGenreEntityToGenreModel);
    //console.log(adpatedGenres.map((genre) => genre.users[0] ? `${genre.name} - ${genre.users.map((user)=> user)}` : 'no users'));
    return adpatedGenres;
  }
}

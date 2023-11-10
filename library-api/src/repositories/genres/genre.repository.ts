import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../../common/errors';
import { Genre, GenreId, User } from '../../entities';
import { GenreRepositoryOutput } from '../../repositories/genres/genre.repository.type';
import { adaptGenreEntityToGenreModel } from '../../repositories/genres/genre.utils';
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
    /*console.log(adpatedGenres.map((genre) => {
      if (genre.users.length > 0) {
        const usersString = genre.users.map(user => user.userName).join(', ');
        return `${genre.name} - ${usersString}`;
      } else {
        return 'no users';
      }
    }));*/
    return adpatedGenres;
  }

  public async updateGenreUsers(genreId: GenreId, user: User): Promise<GenreRepositoryOutput> {
    const genre = await this.findOne({ where: { id: genreId },
      relations: { users: true},});
    const checkUser = genre.users.find((genreUser) => genreUser.id === user.id);
    if(!checkUser) {
      genre.users.push(user);
      await this.save(genre);
    }
    return adaptGenreEntityToGenreModel(genre);
  }
}

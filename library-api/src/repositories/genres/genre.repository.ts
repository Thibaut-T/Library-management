import { Injectable } from '@nestjs/common';
import { Genre, GenreId, User } from 'library-api/src/entities';
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

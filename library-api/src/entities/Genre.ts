/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { BookGenre } from './BookGenre';
import { User } from './User';

export type GenreId = string & { __brand: 'Genre' };

@Entity('Genres')
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: GenreId;

  @Column()
  name: string;

  @OneToMany(() => BookGenre, (bookGenre) => bookGenre.genre)
  bookGenres: BookGenre[];
  
  @ManyToMany(type => User, user => user.favoriteGenres)
  @JoinTable()
  users: User[];
}

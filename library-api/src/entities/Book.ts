import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookGenre } from './BookGenre';
import { Author } from './Author';
import { User } from './User';
import { Comment } from './Comment';

export type BookId = string & { __brand: 'Book' };

@Entity('Books')
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: BookId;

  @Column()
  name: string;

  @Column({ type: 'date' })
  writtenOn: Date;

  @ManyToOne(() => Author, (author) => author.books, { onDelete: 'CASCADE' })
  author: Author;

  @OneToMany(() => BookGenre, (bookGenre) => bookGenre.book)
  bookGenres: BookGenre[];

  @OneToMany(type => Comment, comment => comment.book)
  comments: Comment[];

  @ManyToMany(type => User, user => user.ownedBooks)
  owners: User[];

  @ManyToMany(type => User, user => user.favoriteBook)
  @JoinTable()
  usersFavorite: User[];
}

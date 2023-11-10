import{
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book }  from './Book';
import { Genre } from './Genre';
import { Comment } from './Comment';
import { PlainUserModel} from '../models';

export type UserId = string & { __brand: 'User'};

@Entity('Users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UserId;

  @Column()
  userName: string;

  @Column()
  userLastName: string;

  @ManyToOne(type => Book, book => book.usersFavorite)
  favoriteBook: Book;

  @ManyToMany(type => Book, book => book.owners)
  @JoinTable()
  ownedBooks: Book[];

  @ManyToMany(type => User, user => user.friends)
  @JoinTable()
  friends: User[];

  @ManyToMany(type => Genre, genre => genre.users)
  @JoinTable()
  favoriteGenres: Genre[];

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];
}

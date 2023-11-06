import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commentText: string;

  @ManyToOne(type => User, user => user.comments)
  user: User;

  @ManyToOne(type => Book, book => book.comments)
  book: Book;
}

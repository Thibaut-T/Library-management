import { Author } from './Author';
import { Book } from './Book';
import { BookGenre } from './BookGenre';
import { Genre } from './Genre';
import { User } from 'library-api/src/entities/User';
import { Comment } from 'library-api/src/entities/Comment';


export * from './Author';
export * from './Book';
export * from './BookGenre';
export * from './Genre';
export * from './User';
export * from './Comment';

export const entities = [Author, Book, BookGenre, Genre, User, Comment];

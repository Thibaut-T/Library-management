import { Author } from 'library-api/src/entities/Author';
import { Book } from 'library-api/src/entities/Book';
import { BookGenre } from 'library-api/src/entities/BookGenre';
import { Genre } from 'library-api/src/entities/Genre';
import { User } from 'library-api/src/entities/User';
import { Comment } from 'library-api/src/entities/Comment';


export * from './Author';
export * from './Book';
export * from './BookGenre';
export * from './Genre';
export * from './User';
export * from './Comment';

export const entities = [Author, Book, BookGenre, Genre, User, Comment];

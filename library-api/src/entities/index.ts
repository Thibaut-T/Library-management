import { Author } from './Author';
import { Book } from './Book';
import { BookGenre } from './BookGenre';
import { Genre } from './Genre';
import { User } from './User';
import { Comment } from './Comment';


export * from './Author';
export * from './Book';
export * from './BookGenre';
export * from './Genre';
export * from './User';
export * from './Comment';

export const entities = [Author, Book, BookGenre, Genre, User, Comment];

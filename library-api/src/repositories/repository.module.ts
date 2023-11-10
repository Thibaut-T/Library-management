import { Module } from '@nestjs/common';
import { AuthorRepository } from '../repositories/authors/author.repository';
import { BookRepository } from '../repositories/books/book.repository';
import { GenreRepository } from '../repositories/genres/genre.repository';
import { BookGenreRepository } from '../repositories/bookGenres/bookGenre.repository';
import { UserRepository } from '../repositories/users/user.repository';
import { CommentRepository } from '../repositories/comments/comment.repository';

const repositories = [AuthorRepository, BookRepository, GenreRepository, BookGenreRepository, UserRepository, CommentRepository];

@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}

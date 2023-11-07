import { Module } from '@nestjs/common';
import { AuthorRepository } from 'library-api/src/repositories/authors/author.repository';
import { BookRepository } from 'library-api/src/repositories/books/book.repository';
import { GenreRepository } from 'library-api/src/repositories/genres/genre.repository';
import { BookGenreRepository } from 'library-api/src/repositories/bookGenres/bookGenre.repository';
import { UserRepository } from 'library-api/src/repositories/users/user.repository';
import { CommentRepository } from 'library-api/src/repositories/comments/comment.repository';

const repositories = [AuthorRepository, BookRepository, GenreRepository, BookGenreRepository, UserRepository, CommentRepository];

@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}

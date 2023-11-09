import { Module } from '@nestjs/common';
import { AuthorRepository } from './authors/author.repository';
import { BookRepository } from './books/book.repository';
import { GenreRepository } from './genres/genre.repository';
import { BookGenreRepository } from '../repositories/bookGenres/bookGenre.repository';

const repositories = [AuthorRepository, BookRepository, GenreRepository, BookGenreRepository];

@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}

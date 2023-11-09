import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repositories/repository.module';
import { AuthorUseCases } from './authors/author.useCases';
import { BookUseCases } from './books/book.useCases';
import { GenreUseCases } from './genres/genre.useCases';

const useCases = [AuthorUseCases, BookUseCases, GenreUseCases];

@Module({
  imports: [RepositoryModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class UseCasesModule {}

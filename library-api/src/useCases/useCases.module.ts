import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repositories/repository.module';
import { AuthorUseCases } from '../useCases/authors/author.useCases';
import { BookUseCases } from '../useCases/books/book.useCases';
import { GenreUseCases } from '../useCases/genres/genre.useCases';
import { UserUseCases } from '../useCases/users/user.useCases';

const useCases = [AuthorUseCases, BookUseCases, GenreUseCases,UserUseCases];

@Module({
  imports: [RepositoryModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class UseCasesModule {}

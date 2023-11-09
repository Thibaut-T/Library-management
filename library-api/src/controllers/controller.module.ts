import { Module } from '@nestjs/common';
import { AuthorController } from './authors/author.controller';
import { BookController } from './books/book.controller';
import { GenreController } from './genres/genre.controller';
import { RepositoryModule } from '../repositories/repository.module';
import { UseCasesModule } from '../useCases/useCases.module';

@Module({
  imports: [UseCasesModule, RepositoryModule],
  controllers: [AuthorController, BookController, GenreController],
})
export class ControllerModule {}

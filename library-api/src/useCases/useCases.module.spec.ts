import { Test, TestingModule } from '@nestjs/testing';
import { UseCasesModule } from './useCases.module';
import { AuthorUseCases } from './authors/author.useCases';
import { BookUseCases } from './books/book.useCases';
import { GenreUseCases } from './genres/genre.useCases';

describe('UseCasesModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UseCasesModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide use case providers', () => {
    const authorUseCases = module.get<AuthorUseCases>(AuthorUseCases);
    const bookUseCases = module.get<BookUseCases>(BookUseCases);
    const genreUseCases = module.get<GenreUseCases>(GenreUseCases);

    expect(authorUseCases).toBeDefined();
    expect(bookUseCases).toBeDefined();
    expect(genreUseCases).toBeDefined();
  });
});

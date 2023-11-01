import { Injectable } from '@nestjs/common';
import { GenreRepository } from 'library-api/src/repositories';
import { GenreUseCasesOutput } from 'library-api/src/useCases/genres/genre.useCases.type';

@Injectable()
export class GenreUseCases {
    constructor(private readonly genreRepository: GenreRepository) {}

    public async getAllGenres(): Promise<GenreUseCasesOutput[]> {
        return this.genreRepository.getAllGenres();
    }
}

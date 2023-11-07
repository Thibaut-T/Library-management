import { Injectable } from '@nestjs/common';
import { GenreRepository } from '../../repositories';
import { GenreUseCasesOutput } from '../../useCases/genres/genre.useCases.type';

@Injectable()
export class GenreUseCases {
    constructor(private readonly genreRepository: GenreRepository) {}

    public async getAllGenres(): Promise<GenreUseCasesOutput[]> {
        return this.genreRepository.getAllGenres();
    }
}

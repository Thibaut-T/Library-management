import { Controller, Get, Param } from '@nestjs/common';
import { GenrePresenter,} from './genre.presenter';
import { GenreUseCases } from 'library-api/src/useCases';

@Controller('genres')
export class GenreController {
    constructor(private readonly genreUseCases: GenreUseCases) {}

    @Get('/')
    public async getAll(): Promise<GenrePresenter[]> {
        const genres = await this.genreUseCases.getAllGenres()
        return genres.map(GenrePresenter.from);
    }
}

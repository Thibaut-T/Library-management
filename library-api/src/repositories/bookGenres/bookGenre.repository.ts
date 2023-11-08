import { Injectable } from '@nestjs/common';
import { NotFoundError, BadRequestError } from '../../common/errors';
import { BookGenre } from '../../entities';
import { Book, BookGenreId, GenreId } from '../../entities';
import { GenreRepository } from '../../repositories';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BookGenreRepository extends Repository<BookGenre> {
  constructor(public readonly dataSource: DataSource,
    private readonly genreRepository: GenreRepository) {
    super(BookGenre, dataSource.createEntityManager());
  }

    /**
     * Get all bookGenres
     * @returns Array of bookGenres
     */
    public async getAll(): Promise<BookGenre[]> {
        const bookGenres = await this.find();
        return bookGenres;
    }
    public async createBookGenre(book: Book, genreId: GenreId): Promise<BookGenre> {
        const genre = await this.genreRepository.findOne({ where: { id: genreId }});
        const bookGenre = new BookGenre();
        bookGenre.book = book;
        bookGenre.genre = genre;
        await this.save(bookGenre);
        return bookGenre;
    };
}
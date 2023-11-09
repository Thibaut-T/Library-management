
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookGenreRepository } from './bookGenre.repository';
import { Genre } from '../../entities/Genre';
import { Injectable } from '@nestjs/common';
import { NotFoundError, BadRequestError } from '../../common/errors';
import { BookGenre } from '../../entities';
import { Book, BookGenreId, GenreId, BookId } from '../../entities';
import { GenreRepository } from '../../repositories';
import { DataSource, Repository } from 'typeorm';



describe('BookGenreRepository', () => {
    let bookGenreRepository: BookGenreRepository;
    let genreRepository: GenreRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookGenreRepository,
                GenreRepository,
                {
                    provide: getRepositoryToken(BookGenre),
                    useValue: {},
                },
                {
                    provide: getRepositoryToken(Genre),
                    useValue: {},
                },
            ],
        }).compile();

        bookGenreRepository = module.get<BookGenreRepository>(BookGenreRepository);
        genreRepository = module.get<GenreRepository>(GenreRepository);
    });

    describe('getAll', () => {
        it('should return an array of book genres', async () => {
            const result: BookGenre[] = [];
            jest.spyOn(bookGenreRepository, 'find').mockResolvedValue(result);
            expect(await bookGenreRepository.getAll()).toBe(result);
        });
    });

    describe('createBookGenre', () => {
        it('should create a book genre', async () => {
            const book: Book = { id: '123' as BookId, title: 'Test Book' };
            const genre: Genre = { id: '456' as GenreId, name: 'Test Genre' };
            const bookGenre: BookGenre = { id:'789' as BookGenreId, book, genre };
            jest.spyOn(genreRepository, 'findOneOrFail').mockResolvedValue(genre);
            jest.spyOn(bookGenreRepository, 'save').mockResolvedValue(bookGenre);
            expect(await bookGenreRepository.createBookGenre(book, genre.id)).toBe(bookGenre);
        });
    });
});

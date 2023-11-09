import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../../common/errors';
import { Genre } from '../../entities';
export { GenreRepository } from './genre.repository';
import { GenreRepositoryOutput,  } from '../../repositories/genres/genre.repository.type';
import { adaptGenreEntityToGenreModel } from '../../repositories/genres/genre.utils';
import { DataSource, Repository } from 'typeorm';
import { GenreRepository } from './genre.repository';
import { Connection, createConnection } from 'typeorm';






describe('GenreRepository find method', () => {
    it('should resolve with sample data', async () => {
      const mockDataSource: DataSource = {} as any; // Replace with your actual mocking method
      const genreRepository = new GenreRepository(mockDataSource);
      const sampleGenres = [{ name: 'Action' }, { name: 'Comedy' }];
      genreRepository.find = jest.fn().mockResolvedValue(sampleGenres);
      const genres = await genreRepository.getAllGenres();
      expect(genres).toEqual(sampleGenres); // Expect the genres to be equal to the sample data
    });
  });




describe('GenreRepository getAllGenres mapping', () => {
    it('should map genres using adaptGenreEntityToGenreModel', () => {
      const genres = [{ name: 'Action' }, { name: 'Comedy' }];
  
      const mappedGenres = genres.map(adaptGenreEntityToGenreModel);
  
      expect(mappedGenres).toHaveLength(2); 
      expect(mappedGenres[0]).toEqual({ name: 'Action' });
      expect(mappedGenres[1]).toEqual({ name: 'Comedy' });
    });
  });
import { AuthorController } from './author.controller';
import { Controller } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorUseCases } from '../../useCases/authors/author.useCases';
import { AuthorRepository } from '../../repositories';
import { Author } from '../../entities';
import { DataSource } from 'typeorm';

class MockDataSource {
  createEntityManager() {
  }
}

describe('AuthorController', () => {
    let controller: AuthorController;
    let authorUseCases: AuthorUseCases;
    let authorRepository: AuthorRepository;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthorController],
        providers: [
          {
            provide: DataSource,
            useClass: MockDataSource,
          },
          AuthorUseCases,
          AuthorRepository,
        ],
      }).compile();
  
      controller = module.get<AuthorController>(AuthorController);
    });
  
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
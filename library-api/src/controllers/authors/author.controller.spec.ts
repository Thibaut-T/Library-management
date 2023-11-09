import { AuthorController } from './author.controller';
import { Controller } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';


describe('AuthorController', () => {
    let controller: AuthorController;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthorController],
      }).compile();
  
      controller = module.get<AuthorController>(AuthorController);
    });
  
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
/*import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserUseCases } from '../../useCases/users/user.useCases';
import { PlainUserModel, UserModel } from '../../models';
import { UserId, GenreId } from '../../entities';
import { UserRepository } from '../../repositories';
import { DataSource } from 'typeorm';
import { CommentRepository } from '../../repositories';
import { BookRepository } from '../../repositories';
import { GenreRepository } from '../../repositories';

class MockDataSource {
  createEntityManager() {
  }
}
describe('UserController', () => {
  let controller: UserController;
  let userUseCases: UserUseCases;
  let userRepository: UserRepository;
  let commentRepository: CommentRepository;
  let bookRepository: BookRepository;
  let genreRepository: GenreRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: DataSource,
          useClass: MockDataSource,
        },
        CommentRepository,
        UserUseCases,
        UserRepository,
        BookRepository,
        GenreRepository,
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userUseCases = module.get<UserUseCases>(UserUseCases);
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const users: PlainUserModel[] = []; // your test data here
      jest.spyOn(userUseCases, 'getAllUsers').mockResolvedValue(users);

      expect(await controller.getAll()).toBe(users);
    });
  });

  describe('getById', () => {
    it('should return a user by ID', async () => {
      const user: PlainUserModel = {
        id: '123' as UserId,
        userName: 'test',
        userLastName: 'test',
      };
      jest.spyOn(userUseCases, 'getUserById').mockResolvedValue(user);

      expect(await controller.getById('123' as UserId)).toBe(user);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
*/
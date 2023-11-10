import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../controllers/users/user.controller';
import { UserUseCases } from '../../useCases/users/user.useCases';
import { PlainUserModel, UserModel } from '../../models';
import { UserId, GenreId } from '../../entities';
import { UserRepository } from '../../repositories'; // Import the UserRepository

describe('UserController', () => {
  let controller: UserController;
  let userUseCases: UserUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserUseCases,
        {
          provide: UserRepository,
          useValue: {}, // Mock or actual instance of your UserRepository
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userUseCases = module.get<UserUseCases>(UserUseCases);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersHttpController } from './users-http.controller';
import { IUsersService } from '../interfaces/users.interface';

class UsersService implements IUsersService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createUserDto: CreateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(guid: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOneByEmailAndPassword(email: string, password: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(guid: string, updateUserDto: UpdateUserDto): Promise<void> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(guid: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

describe('UsersController', () => {
  let controller: UsersHttpController;
  const usersService: IUsersService = new UsersService();

  beforeEach(async () => {
    controller = new UsersHttpController(usersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

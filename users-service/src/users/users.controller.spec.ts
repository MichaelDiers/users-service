import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { IUsersService } from './users.interface';

class UsersService implements IUsersService {
  create(createUserDto: CreateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findOne(guid: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(guid: string, updateUserDto: UpdateUserDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  remove(guid: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: IUsersService = new UsersService();

  beforeEach(async () => {
    controller = new UsersController(usersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

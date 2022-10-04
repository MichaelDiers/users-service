import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { IUsersDatabaseService } from './interfaces/users-database.interface';
import { UsersService } from './users.service';

const createCreateDto = () => {
  const dto = new CreateUserDto();
  dto.displayName = v4();
  dto.email = v4();
  dto.password = v4();
  return dto;
};

@Injectable()
export class UsersDatabaseService implements IUsersDatabaseService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(guid: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findOneByPredicate(
    predicate: (user: User) => Promise<boolean>, // eslint-disable-line @typescript-eslint/no-unused-vars
  ): Promise<User> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(guid: string, data: any): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(guid: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

describe('UsersService', () => {
  let service: UsersService;
  let database: IUsersDatabaseService;

  beforeEach(async () => {
    database = new UsersDatabaseService();
    service = new UsersService(database);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should fail if user with guid exists', async () => {
      jest
        .spyOn(database, 'create')
        .mockImplementation(() => new Promise((resolve) => resolve(undefined)));
      const dto = createCreateDto();
      await expect(service.create(dto)).rejects.toEqual(
        new ConflictException(),
      );
    });

    it('should succeed if user is created in database', async () => {
      const dto = createCreateDto();
      const user = new User(dto);
      jest
        .spyOn(database, 'create')
        .mockImplementation(() => new Promise((resolve) => resolve(user)));
      await expect(service.create(dto)).resolves.toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should return an empty list', async () => {
      jest
        .spyOn(database, 'findAll')
        .mockImplementation(() => new Promise((resolve) => resolve([])));
      await expect(service.findAll()).resolves.toEqual([]);
    });

    it('should return a non empty list', async () => {
      const users = [new User(createCreateDto()), new User(createCreateDto())];
      jest
        .spyOn(database, 'findAll')
        .mockImplementation(() => new Promise((resolve) => resolve(users)));
      await expect(service.findAll()).resolves.toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should fail if the guid is unknown', async () => {
      jest
        .spyOn(database, 'findOne')
        .mockImplementation(() => new Promise((resolve) => resolve(undefined)));
      await expect(service.findOne(v4())).rejects.toEqual(
        new NotFoundException(),
      );
    });

    it('should succeed if guid is known', async () => {
      const dto = createCreateDto();
      const user = new User(dto);
      jest
        .spyOn(database, 'findOne')
        .mockImplementation(() => new Promise((resolve) => resolve(user)));
      await expect(service.findOne(v4())).resolves.toEqual(user);
    });
  });

  describe('update', () => {
    it('should fail if no update data is provided', async () => {
      await expect(service.update(v4(), {})).rejects.toEqual(
        new BadRequestException(),
      );
    });

    it('should fail if no user with guid is found', async () => {
      jest
        .spyOn(database, 'update')
        .mockImplementation(() => new Promise((resolve) => resolve(false)));
      await expect(service.update(v4(), { displayName: v4() })).rejects.toEqual(
        new NotFoundException(),
      );
    });

    it('should succeed for valid guid and valid update data', async () => {
      jest
        .spyOn(database, 'update')
        .mockImplementation(() => new Promise((resolve) => resolve(true)));
      await expect(
        service.update(v4(), { displayName: v4() }),
      ).resolves.toBeUndefined();
    });
  });

  describe('remove', () => {
    it('remove should fail if guid is unknown', async () => {
      jest
        .spyOn(database, 'remove')
        .mockImplementation(() => new Promise((resolve) => resolve(false)));
      await expect(service.remove(v4())).rejects.toEqual(
        new NotFoundException(),
      );
    });

    it('remove should succeed if user is deleted in database', async () => {
      jest
        .spyOn(database, 'remove')
        .mockImplementation(() => new Promise((resolve) => resolve(true)));
      await expect(service.remove(v4())).resolves.toBeUndefined;
    });
  });
});

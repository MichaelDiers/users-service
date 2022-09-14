import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  IUsersDatabaseService,
  USERS_DATABASE_SERVICE,
} from './interfaces/users-database.interface';
import { IUsersService } from './interfaces/users.interface';

/**
 * Service that provides CRUD logic for Users.
 */
@Injectable()
export class UsersService implements IUsersService {
  /**
   * Ceeates a new UsersService instance.
   * @param databaseService Service for accessing the database.
   */
  constructor(
    @Inject(USERS_DATABASE_SERVICE)
    private readonly databaseService: IUsersDatabaseService,
  ) {}

  /**
   * Create a new user.
   * @param createUserDto The data of the new user.
   * @returns A Promise<T> whose result is a User.
   * @throws {ConflictException} Is thrown if a user with the id already exists.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User(createUserDto);
    const result = await this.databaseService.create(user);
    if (!result) {
      throw new ConflictException();
    }

    return result;
  }

  /**
   * Find all users.
   * @returns A Promise<T> whose result is an array of User.
   */
  findAll(): Promise<User[]> {
    return this.databaseService.findAll();
  }

  /**
   * Find a User by its id.
   * @param guid The id of the user.
   * @returns A Promise<T> whose result is a User.
   * @throws {NotFoundException} Is thrown if no user with the given guid exists.
   */
  async findOne(guid: string): Promise<User> {
    const result = await this.databaseService.findOne(guid);
    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  /**
   * Update a user.
   * @param guid The id of the user.
   * @param updateUserDto The data of the user to be updated.
   * @throws {BadRequestException} Is thrown if no update data is provided.
   * @throws {NotFoundException} Is thrown if no user with the given guid exists.
   */
  async update(guid: string, updateUserDto: UpdateUserDto): Promise<void> {
    const data: any = {};
    let hasUpdate = false;

    Object.entries(updateUserDto).forEach(([key, value]) => {
      if (value || value === false) {
        data[key] = value;
        hasUpdate = true;
      }
    });

    if (!hasUpdate) {
      throw new BadRequestException();
    }

    const result = await this.databaseService.update(guid, data);

    if (!result) {
      throw new NotFoundException();
    }
  }

  /**
   * Delete a user.
   * @param guid The id of the user.
   * @throws {NotFoundException} Is thrown if no user with the given id exists.
   */
  async remove(guid: string): Promise<void> {
    const result = await this.databaseService.remove(guid);
    if (!result) {
      throw new NotFoundException();
    }
  }
}

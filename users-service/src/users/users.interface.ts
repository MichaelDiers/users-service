import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

/**
 * Name used for depedency injection.
 */
export const USERS_SERVICE = 'USERS_SERVICE';

/**
 * Service that provides CRUD logic for Users.
 */
export interface IUsersService {
  /**
   * Create a new user.
   * @param createUserDto The data of the new user.
   * @returns A Promise<T> whose result is a User.
   * @throws {ConflictException} Is thrown if a user with the id already exists.
   */
  create(createUserDto: CreateUserDto): Promise<User>;

  /**
   * Find all users.
   * @returns A Promise<T> whose result is an array of User.
   */
  findAll(): Promise<User[]>;

  /**
   * Find a User by its id.
   * @param guid The id of the user.
   * @returns A Promise<T> whose result is a User.
   * @throws {NotFoundException} Is thrown if no user with the given guid exists.
   */
  findOne(guid: string): Promise<User>;

  /**
   * Update a user.
   * @param guid The id of the user.
   * @param updateUserDto The data of the user to be updated.
   * @throws {BadRequestException} Is thrown if no update data is provided.
   * @throws {NotFoundException} Is thrown if no user with the given guid exists.
   */
  update(guid: string, updateUserDto: UpdateUserDto): Promise<void>;

  /**
   * Delete a user.
   * @param guid The id of the user.
   * @throws {NotFoundException} Is thrown if no user with the given id exists.
   */
  remove(guid: string): Promise<void>;
}

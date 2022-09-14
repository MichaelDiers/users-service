import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

/**
 * Interface that describes operations on users for controller and client.
 */
export default interface IUsersClient {
  /**
   * Create a new user.
   * @param createUserDto DTO that contains the validated user data.
   * @returns A Promise<T> whose result is a User.
   */
  create(data: CreateUserDto): Promise<User>;

  /**
   * Find all users of the application.
   * @returns A Promise<T> whose result is an array of User.
   */
  findAll(): Promise<User[]>;

  /**
   * Get a user by its id.
   * @param guid The id of the user.
   * @returns A Promise<T> whose result is a User.
   */
  findOne(guid: string): Promise<User>;

  /**
   * Update the data of a user.
   * @param guid The id of the user.
   * @param updateUserDto The data that should be updated.
   * @returns A Promise with an empty result.
   */
  update(guid: string, data: UpdateUserDto): Promise<void>;

  /**
   * Delete a user by its id.
   * @param guid The id of the user.
   * @returns A Promise<T> with an empty result.
   */
  remove(guid: string): Promise<void>;

  /**
   * Execute a simple health check.
   * @returns A Promise<T> with an empty result.
   */
  healthCheck(): Promise<void>;

  /**
   * Close the client connection.
   */
  close(): Promise<void>;
}

import { User } from '../entities/user.entity';

/**
 * Used for dependency injection.
 */
export const USERS_DATABASE_SERVICE = 'USERS_DATABASE_SERVICE';

/**
 * Database for users.
 */
export interface IUsersDatabaseService {
  /**
   * Create a new user in the database.
   * @param user The user to be created.
   * @returns A Promise<T> whose result is the User if the user is
   *  created and undefined otherwise.
   */
  create(user: User): Promise<User | undefined>;

  /**
   * List all users in the database.
   * @returns A Promise<T> whose result is an array of User.
   */
  findAll(): Promise<User[]>;

  /**
   * Find a user by its guid.
   * @param guid The id of the user.
   * @returns A Promise<T> whose result is the user if a user with the guid exists and
   *  undefined otherwise.
   */
  findOne(guid: string): Promise<User | undefined>;

  /**
   * Find a user that matches the given predicate.
   * @param predicate A function that checks for a matching user.
   * @returns A Promise<T> whose result is the the matching user or undefined if no
   *  match is found.
   */
  findOneByPredicate(
    predicate: (user: User) => Promise<boolean>,
  ): Promise<User | undefined>;

  /**
   * Update an existing user.
   * @param guid The id of the user.
   * @param data The data that will be updated.
   * @returns A Promise<T> whose result is true if the user is updated and false otherwise.
   */
  update(guid: string, data: any): Promise<boolean>;

  /**
   * Delete a user by its id.
   * @param guid The id of the user.
   * @returns A Promise<T> whose result is true if the user is deleted and false otherwise.
   */
  remove(guid: string): Promise<boolean>;
}

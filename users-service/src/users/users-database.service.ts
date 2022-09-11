import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { IUsersDatabaseService } from './users-database.interface';

/**
 * Database for users.
 */
@Injectable()
export class UsersDatabaseService implements IUsersDatabaseService {
  // in memory database
  private database: User[] = [];

  /**
   * Create a new user in the database.
   * @param user The user to be created.
   * @returns A Promise<T> whose result is the User if the user is
   *  created and undefined otherwise.
   */
  async create(user: User): Promise<User | undefined> {
    try {
      this.database.push(user);
      return user;
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return;
      }

      throw err;
    }
  }

  /**
   * List all users in the database.
   * @returns A Promise<T> whose result is an array of User.
   */
  async findAll(): Promise<User[]> {
    return this.database;
  }

  /**
   * Find a user by its guid.
   * @param guid The id of the user.
   * @returns A Promise<T> whose result is the user if a user with the guid exists and
   *  undefined otherwise.
   */
  async findOne(guid: string): Promise<User | undefined> {
    return this.database.find((user) => user.guid === guid);
  }

  /**
   * Update an existing user.
   * @param guid The id of the user.
   * @param data The data that will be updated.
   * @returns A Promise<T> whose result is true if the user is updated and false otherwise.
   */
  async update(guid: string, data: any): Promise<boolean> {
    const user = this.database.find(({ guid: dbGuid }) => guid === dbGuid);
    if (!user) {
      return false;
    }

    Object.assign(user, data);
    return true;
  }

  /**
   * Delete a user by its id.
   * @param guid The id of the user.
   * @returns A Promise<T> whose result is true if the user is deleted and false otherwise.
   */
  async remove(guid: string): Promise<boolean> {
    const count = this.database.length;
    this.database = this.database.filter((user) => user.guid !== guid);
    return count === this.database.length + 1;
  }
}

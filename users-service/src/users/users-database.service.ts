import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserEntity } from './entities/user.entity';
import { User as UserDatabase, UserDocument } from './database/user.schema';
import { IUsersDatabaseService } from './users-database.interface';

/**
 * Database for users.
 */
@Injectable()
export class UsersDatabaseService implements IUsersDatabaseService {
  constructor(
    @InjectModel(UserDatabase.name)
    private userModel: Model<UserDocument>,
  ) {}

  /**
   * Create a new user in the database.
   * @param user The user to be created.
   * @returns A Promise<T> whose result is the User if the user is
   *  created and undefined otherwise.
   */
  async create(user: UserEntity): Promise<UserEntity | undefined> {
    try {
      const document = new this.userModel(user);
      await document.save();
      return new UserEntity(document);
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
  async findAll(): Promise<UserEntity[]> {
    const documents = await this.userModel.find().exec();
    return documents.map((document) => new UserEntity(document));
  }

  /**
   * Find a user by its guid.
   * @param guid The id of the user.
   * @returns A Promise<T> whose result is the user if a user with the guid exists and
   *  undefined otherwise.
   */
  async findOne(guid: string): Promise<UserEntity | undefined> {
    const document = await this.userModel.findOne({ guid }).exec();
    if (document) {
      return new UserEntity(document);
    }
  }

  /**
   * Update an existing user.
   * @param guid The id of the user.
   * @param data The data that will be updated.
   * @returns A Promise<T> whose result is true if the user is updated and false otherwise.
   */
  async update(guid: string, data: any): Promise<boolean> {
    const result = await this.userModel.updateOne({ guid }, data).exec();
    return result.acknowledged && result.matchedCount === 1;
  }

  /**
   * Delete a user by its id.
   * @param guid The id of the user.
   * @returns A Promise<T> whose result is true if the user is deleted and false otherwise.
   */
  async remove(guid: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ guid }).exec();
    return result.acknowledged && result.deletedCount === 1;
  }
}

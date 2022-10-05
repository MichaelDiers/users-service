import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserEntity } from './entities/user.entity';
import { User as UserDatabase, UserDocument } from './database/user.schema';
import { IUsersDatabaseService } from './interfaces/users-database.interface';

/**
 * Database for users.
 */
@Injectable()
export class UsersDatabaseService implements IUsersDatabaseService {
  /**
   * Create a new instance of UsersDatabaseService.
   * @param userModel The model for database operations on users.
   */
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
      if (err.name === 'MongoServerError' && err.code === 11000) {
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
   * Find a user that matches the given predicate.
   * @param predicate A function that checks for a matching user.
   * @returns A Promise<T> whose result is the the matching user or undefined if no
   *  match is found.
   */
  async findOneByPredicate(
    predicate: (user: UserEntity) => Promise<boolean>,
  ): Promise<UserEntity | undefined> {
    let start = 0;
    const size = 100;
    let documents = await this.userModel.find().skip(start).limit(size);
    while (documents && documents.length !== 0) {
      const results = await Promise.all(
        documents.map((document) => predicate(new UserEntity(document))),
      );
      const index = results.findIndex((result) => result);
      if (index > -1) {
        return new UserEntity(documents[index]);
      }
    }

    start += size;
    documents = await this.userModel.find().skip(start).limit(size);
  }

  /**
   * Update an existing user.
   * @param guid The id of the user.
   * @param data The data that will be updated.
   * @returns A Promise<T> whose result is true if the user is updated and false otherwise.
   */
  async update(guid: string, data: any): Promise<boolean> {
    try {
      const result = await this.userModel.updateOne({ guid }, data).exec();
      return result.acknowledged && result.matchedCount === 1;
    } catch (err) {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        throw new ConflictException();
      }

      throw err;
    }
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

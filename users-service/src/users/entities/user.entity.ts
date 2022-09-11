import { Exclude } from 'class-transformer';
import { v4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';

/**
 * Describes a user entity.
 */
export class User {
  /**
   * Creates a new instance of User.
   * @param createUserDto Data is initialized from the given dto data.
   */
  constructor(createUserDto: CreateUserDto) {
    Object.assign(this, createUserDto);
    this.guid = v4();
  }

  /**
   * The display name of the user.
   */
  displayName: string;

  /**
   * The email of the user as a hash value.
   */
  @Exclude()
  email: string;

  /**
   * The unqiue id of the user.
   */
  guid: string;

  /**
   * The password of the user as a hash value.
   */
  @Exclude()
  password: string;
}

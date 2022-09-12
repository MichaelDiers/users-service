import { Exclude } from 'class-transformer';
import { v4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { User as UserDatabase } from '../database/user.schema';

/**
 * Describes a user entity.
 */
export class User {
  /**
   * Creates a new instance of User.
   * @param user Data is initialized from the given data.
   */
  constructor(user?: CreateUserDto | UserDatabase) {
    if (user) {
      this.displayName = user.displayName;
      this.email = user.email;
      this.password = user.password;

      const userDatabase = user as UserDatabase;
      this.guid = userDatabase.guid || v4();
    }
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

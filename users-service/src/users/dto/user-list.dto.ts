import { User } from '../entities/user.entity';

/**
 * DTO for providing a list of User.
 */
export default class UserListDto {
  /**
   * All known users of the application.
   */
  users: User[];
}

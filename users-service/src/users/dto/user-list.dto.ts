import { User } from '../entities/user.entity';

/**
 * DTO for providing a list of User.
 */
export default class UserListDto {
  users: User[];
}

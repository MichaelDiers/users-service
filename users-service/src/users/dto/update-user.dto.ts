import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

/**
 * DTO for updating an user.
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}

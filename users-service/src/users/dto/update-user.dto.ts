import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * DTO for updating an user.
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}

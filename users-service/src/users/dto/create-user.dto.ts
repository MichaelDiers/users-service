import { IsEmail, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { Constants } from '../../validation/constants';

/**
 * DTO for creating a new user.
 */
export class CreateUserDto {
  /**
   * The name of the user that is displayed instead of the email.
   */
  @IsString()
  @Length(Constants.DISPLAY_NAME_MIN_LENGTH, Constants.DISPLAY_NAME_MAX_LENGTH)
  displayName: string;

  /**
   * The email address of the user as plain text.
   */
  @IsEmail()
  @Length(Constants.EMAIL_MIN_LENGTH, Constants.EMAIL_MAX_LENGTH)
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  /**
   * The password of the user as plain text.
   */
  @IsString()
  @Length(Constants.PASSWORD_MIN_LENGTH, Constants.PASSWORD_MAX_LENGTH)
  password: string;
}

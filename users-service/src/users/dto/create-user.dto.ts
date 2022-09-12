import { IsEmail, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { Constants } from '../../validation/constants';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a new user.
 */
export class CreateUserDto {
  /**
   * The name of the user that is displayed instead of the email.
   */
  @IsString()
  @Length(Constants.DISPLAY_NAME_MIN_LENGTH, Constants.DISPLAY_NAME_MAX_LENGTH)
  @ApiProperty({
    example: 'Jane Doe',
    minLength: Constants.DISPLAY_NAME_MIN_LENGTH,
    maxLength: Constants.DISPLAY_NAME_MAX_LENGTH,
  })
  displayName: string;

  /**
   * The email address of the user as plain text.
   */
  @IsEmail()
  @Length(Constants.EMAIL_MIN_LENGTH, Constants.EMAIL_MAX_LENGTH)
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({
    example: 'jane.doe@example.com',
    minLength: Constants.EMAIL_MIN_LENGTH,
    maxLength: Constants.EMAIL_MAX_LENGTH,
  })
  email: string;

  /**
   * The password of the user as plain text.
   */
  @IsString()
  @Length(Constants.PASSWORD_MIN_LENGTH, Constants.PASSWORD_MAX_LENGTH)
  @ApiProperty({
    example: 'hgfdrtzhjkoiuzt',
    minLength: Constants.PASSWORD_MIN_LENGTH,
    maxLength: Constants.PASSWORD_MAX_LENGTH,
  })
  password: string;
}

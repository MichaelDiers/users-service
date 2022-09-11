import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

/**
 * Transform the email and password of a CreateUserDto into its hashes.
 */
@Injectable()
export class HashPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    switch (metadata.metatype.name) {
        case CreateUserDto.name:
            return this.transformCreateUserDto(value);
        case UpdateUserDto.name:
            return this.transformUpdateUserDto(value);
        default:
            return value;
    }
  }

  /**
   * Replace email and password of CreateUserDtos by its hashed values.
   * @param value The input value as any. 
   * @returns If the input is a CreateUserDto 
   *    the email and password are hashed and the object returned,
   *    otherwise the input value is returned.
   */
  private transformCreateUserDto(value: any): any {
    const data = value as CreateUserDto;
    if (!data.email || !data.password) {
        return value;
    }

    data.email = hashSync(data.email, parseInt(process.env.HASH_ROUNDS));
    data.password = hashSync(data.password, parseInt(process.env.HASH_ROUNDS));
    return data;
  }

  /**
   * Replace email and password of UpdateUserDtos by its hashed values if the value are set.
   * @param value The input value as any. 
   * @returns If the input is a UpdateUserDto 
   *    the email and password are hashed and the object returned,
   *    otherwise the input value is returned.
   */
  private transformUpdateUserDto(value: any): any {
    const data = value as UpdateUserDto;
    if (data.email) {
        data.email = hashSync(data.email, parseInt(process.env.HASH_ROUNDS));
    }

    if (data.password) {
        data.password = hashSync(data.password, parseInt(process.env.HASH_ROUNDS));
    }

    return data;
  }
}

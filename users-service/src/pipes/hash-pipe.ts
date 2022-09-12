import { ConfigService } from '@nestjs/config';
import { PipeTransform, Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { EnvNames } from 'src/env-names';

/**
 * Transform the email and password of the given object into its hashes.
 */
@Injectable()
export class HashPipe implements PipeTransform {
  /**
   * Creates a new instance of HashPipe.
   * @param configService Access the application configuration.
   */
  constructor(private readonly configService: ConfigService) { }

  /**
   * Create hashes for email and password if the fields exists in the given value.
   * @param value An object that will be transformed.
   * @returns The transformed object.
   */
  transform(value: any) {
    const data = value as { email; password };

    const hashRounds = parseInt(this.configService.get(EnvNames.HASH_ROUNDS));
    if (data.email) {
      data.email = hashSync(data.email, hashRounds);
    }

    if (data.password) {
      data.password = hashSync(
        data.password,
        hashRounds,
      );
    }

    return value;
  }
}

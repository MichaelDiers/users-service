import { PipeTransform, Injectable, Inject } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { InjectionNames } from '../configuration/InjectionNames.enum';

/**
 * Transform the email and password of the given object into its hashes.
 */
@Injectable()
export class HashPipe implements PipeTransform {
  /**
   * Creates a new instance of HashPipe.
   * @param hashRounds The number of used hash rounds.
   */
  constructor(
    @Inject(InjectionNames.HASH_ROUNDS) private readonly hashRounds: number,
  ) {}

  /**
   * Create hashes for email and password if the fields exists in the given value.
   * @param value An object that will be transformed.
   * @returns The transformed object.
   */
  transform(value: any) {
    const data = value as { email; password };

    if (data.email) {
      data.email = hashSync(data.email, this.hashRounds);
    }

    if (data.password) {
      data.password = hashSync(data.password, this.hashRounds);
    }

    return value;
  }
}

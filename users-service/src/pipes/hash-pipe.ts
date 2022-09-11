import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { hashSync } from 'bcrypt';

/**
 * Transform the email and password of the given object into its hashes.
 */
@Injectable()
export class HashPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const data = value as { email, password };
    
    if (data.email) {
      data.email = hashSync(data.email, parseInt(process.env.HASH_ROUNDS));
    }

    if (data.password) {
      data.password = hashSync(data.password, parseInt(process.env.HASH_ROUNDS));
    }
    
    return value;
  }
}

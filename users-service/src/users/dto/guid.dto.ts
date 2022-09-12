import { IsString, IsUUID } from 'class-validator';

/**
 * DTO for a single guid.
 */
export default class GuidDto {
  @IsString()
  @IsUUID('4')
  guid: string;
}

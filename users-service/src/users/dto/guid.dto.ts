import { IsString, IsUUID } from 'class-validator';
import { Constants } from '../../validation/constants';

/**
 * DTO for a single guid.
 */
export default class GuidDto {
  /**
   * An uuid in version 4.
   */
  @IsString()
  @IsUUID(Constants.UUID_VERSION)
  guid: string;
}

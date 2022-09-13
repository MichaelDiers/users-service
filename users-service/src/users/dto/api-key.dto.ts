import { IsString, IsUUID } from 'class-validator';

/**
 * Describes an api key parameter.
 */
export default class ApiKeyDto {
  /**
   * The value of the api key.
   */
  @IsString()
  @IsUUID()
  apiKey: string;
}

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import GuidDto from '../dto/guid.dto';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

/**
 * Service interface for the GRPC service.
 */
export interface IGrpcUsersService {
  /**
   * Create a new user.
   * @param createUserDto DTO that contains the validated user data.
   * @param metadata The request metadata that includes the api key.
   * @returns A Promise<T> whose result is a User.
   */
  create(data: CreateUserDto, metadata: Metadata): Observable<any>;

  /**
   * Find all users of the application.
   * @param metadata The request metadata that includes the api key.
   * @returns A Promise<T> whose result is an array of User.
   */
  findAll(data: any, metadata: Metadata): Observable<any>;

  /**
   * Get a user by its id.
   * @param guid The id of the user.
   * @param metadata The request metadata that includes the api key.
   * @returns A Promise<T> whose result is a User.
   */
  findOne(data: GuidDto, metadata: Metadata): Observable<any>;

  /**
   * Update the data of a user.
   * @param guid The id of the user.
   * @param updateUserDto The data that should be updated.
   * @param metadata The request metadata that includes the api key.
   * @returns A Promise with an empty result.
   */
  update(data: UpdateUserDto & GuidDto, metadata: Metadata): Observable<any>;

  /**
   * Delete a user by its id.
   * @param guid The id of the user.
   * @param metadata The request metadata that includes the api key.
   * @returns A Promise<T> with an empty result.
   */
  remove(data: GuidDto, metadata: Metadata): Observable<any>;

  /**
   * Execute a simple health check.
   * @param data The data is not processed.
   * @param metadata The request metadata that includes the api key.
   * @returns A Promise<T> with an empty result.
   */
  healthCheck(data: any, metadata: Metadata): Observable<any>;
}

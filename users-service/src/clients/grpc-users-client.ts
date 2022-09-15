import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { HeaderNames } from '../header-names';
import { CreateUserDto } from '../users/dto/create-user.dto';
import GuidDto from '../users/dto/guid.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { User } from '../users/entities/user.entity';
import { IGrpcUsersService } from '../users/interfaces/users-grpc-controller.interface';
import IUsersClient from '../users/interfaces/users-client.interface';
import UserListDto from '../users/dto/user-list.dto';
import { InjectionNames } from '../configuration/InjectionNames.enum';

/**
 * The name of the grpc users service.
 */
const GRPC_USERS_SERVICE_NAME = 'GrpcUsersService';

/**
 * Client for the users service using grpc.
 */
@Injectable()
export class GrpcUsersClient implements IUsersClient {
  /**
   * Service for accessing the server.
   */
  private readonly clientService: IGrpcUsersService;

  /**
   * The default metadata that is sent to the server.
   */
  private readonly metadata: Metadata;

  /**
   * Creates a new instance of GrpcUsersClient.
   * @param client The grpc client proxy that is configured to access the server by grpc.
   * @param apiKey The api key that is sent to the server.
   */
  constructor(
    @Inject(InjectionNames.CLIENT_GRPC_PROXY)
    private readonly client: ClientGrpcProxy,
    @Inject(InjectionNames.API_KEY) apiKey: string,
  ) {
    this.clientService = client.getService<IGrpcUsersService>(
      GRPC_USERS_SERVICE_NAME,
    );
    this.metadata = new Metadata();
    this.metadata.add(HeaderNames.X_API_KEY, apiKey);
  }

  /**
   * Create a new user.
   * @param createUserDto DTO that contains the validated user data.
   * @returns A Promise<T> whose result is a User.
   */
  async create(data: CreateUserDto): Promise<User> {
    const response = await this.clientService.create(data, this.metadata);
    return await firstValueFrom<User>(response);
  }

  /**
   * Find all users of the application.
   * @returns A Promise<T> whose result is an array of User.
   */
  async findAll(): Promise<User[]> {
    const response = await this.clientService.findAll({}, this.metadata);
    const userListDto = await firstValueFrom<UserListDto>(response);
    return userListDto.users;
  }

  /**
   * Get a user by its id.
   * @param guid The id of the user.
   * @returns A Promise<T> whose result is a User.
   */
  async findOne(guid: string): Promise<User> {
    const dto: GuidDto = { guid };
    const response = await this.clientService.findOne(dto, this.metadata);
    const user = await firstValueFrom<User>(response);
    return user;
  }

  /**
   * Update the data of a user.
   * @param guid The id of the user.
   * @param updateUserDto The data that should be updated.
   * @returns A Promise with an empty result.
   */
  async update(guid: string, data: UpdateUserDto): Promise<void> {
    const dto: UpdateUserDto & GuidDto = {
      guid,
      ...data,
    };
    const response = await this.clientService.update(dto, this.metadata);
    await firstValueFrom(response);
  }

  /**
   * Delete a user by its id.
   * @param guid The id of the user.
   * @returns A Promise<T> with an empty result.
   */
  async remove(guid: string): Promise<void> {
    const dto: GuidDto = {
      guid,
    };
    const response = await this.clientService.remove(dto, this.metadata);
    await firstValueFrom(response);
  }

  /**
   * Execute a simple health check.
   * @returns A Promise<T> with an empty result.
   */
  async healthCheck(): Promise<void> {
    const response = await this.clientService.healthCheck({}, this.metadata);
    await firstValueFrom(response);
  }

  /**
   * Close the client.
   */
  async close(): Promise<void> {
    this.client.close();
  }
}

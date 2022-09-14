import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { InjectionNames } from '../configuration/InjectionNames.enum';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import UserListDto from '../users/dto/user-list.dto';
import { User } from '../users/entities/user.entity';
import IUsersClient from '../users/interfaces/users-client.interface';

/**
 * Client for the users service using tcp.
 */
@Injectable()
export class TcpUsersClient implements IUsersClient {
  /**
   * Indicates if the client is connected.
   */
  private isConnected = false;

  /**
   * Creates a new instance of the TcpUsersClient.
   * @param client A client proxy that is configured to use tcp.
   * @param apiKey The api key that is sent to the server.
   */
  constructor(
    @Inject(InjectionNames.CLIENT_TCP_PROXY)
    private readonly client: ClientProxy,
    @Inject(InjectionNames.API_KEY) private readonly apiKey: string,
  ) {}

  /**
   * Create a new user.
   * @param createUserDto DTO that contains the validated user data.
   * @returns A Promise<T> whose result is a User.
   */
  async create(data: CreateUserDto): Promise<User> {
    const user = await firstValueFrom<User>(
      await (
        await this.connect()
      ).send(
        { cmd: 'create' },
        {
          ...data,
          apiKey: this.apiKey,
        },
      ),
    );

    return user;
  }

  /**
   * Find all users of the application.
   * @returns A Promise<T> whose result is an array of User.
   */
  async findAll(): Promise<User[]> {
    const response = await (
      await this.connect()
    ).send({ cmd: 'findAll' }, { apiKey: this.apiKey });

    const userListDto = await firstValueFrom<UserListDto>(response);
    return userListDto.users;
  }

  /**
   * Get a user by its id.
   * @param guid The id of the user.
   * @returns A Promise<T> whose result is a User.
   */
  async findOne(guid: string): Promise<User> {
    const response = await (
      await this.connect()
    ).send({ cmd: 'findOne' }, { guid, apiKey: this.apiKey });

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
    const response = await (
      await this.connect()
    ).send(
      { cmd: 'update' },
      {
        guid,
        ...data,
        apiKey: this.apiKey,
      },
    );
    await firstValueFrom(response, { defaultValue: true });
  }

  /**
   * Delete a user by its id.
   * @param guid The id of the user.
   * @returns A Promise<T> with an empty result.
   */
  async remove(guid: string): Promise<void> {
    const response = await (
      await this.connect()
    ).send({ cmd: 'remove' }, { guid, apiKey: this.apiKey });

    await firstValueFrom(response, { defaultValue: true });
  }

  /**
   * Execute a simple health check.
   * @returns A Promise<T> with an empty result.
   */
  async healthCheck(): Promise<void> {
    const response = await (
      await this.connect()
    ).send({ cmd: 'healthCheck' }, { apiKey: this.apiKey });
    await firstValueFrom(response, { defaultValue: true });
  }

  /**
   * Close the client.
   */
  async close(): Promise<void> {
    this.client.close();
  }

  /**
   * Establish a connection to the server.
   * @returns The proxy client that is connected to the server.
   */
  private async connect(): Promise<ClientProxy> {
    if (!this.isConnected) {
      await this.client.connect();
    }

    return this.client;
  }
}

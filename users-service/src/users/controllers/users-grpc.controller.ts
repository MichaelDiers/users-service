import {
  Controller,
  Inject,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { IUsersService, USERS_SERVICE } from '../interfaces/users.interface';
import GuidDto from '../dto/guid.dto';
import UserListDto from '../dto/user-list.dto';
import { HttpExceptionInterceptor } from '../../interceptors/http-exception.interceptor';
import { ApiKeyGrpcGuard } from '../../guards/api-key-grpc.guard';
import { HashPipe } from '../../pipes/hash-pipe';

/**
 * GRPC CRUD Controller for users.
 */
@UsePipes(
  new ValidationPipe({
    stopAtFirstError: true,
    whitelist: true, // remove all unknown fields
  }),
  HashPipe,
)
@UseInterceptors(new HttpExceptionInterceptor())
@UseGuards(ApiKeyGrpcGuard)
@Controller()
export class GrpcUsersService {
  /**
   * Creates a new instance of UserController.
   * @param usersService Service that provides crud operations on users.
   */
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}

  /**
   * Create a new user.
   * @param createUserDto DTO that contains the validated user data.
   * @returns A Promise<T> whose result is a User.
   */
  @GrpcMethod()
  create(data: CreateUserDto): Promise<User> {
    return this.usersService.create(data);
  }

  /**
   * Find all users of the application.
   * @returns A Promise<T> whose result is an array of User.
   */
  @GrpcMethod()
  async findAll(): Promise<UserListDto> {
    const dto = new UserListDto();
    dto.users = await this.usersService.findAll();
    return dto;
  }

  /**
   * Get a user by its id.
   * @param guid The id of the user.
   * @returns A Promise<T> whose result is a User.
   */
  @GrpcMethod()
  findOne(data: GuidDto): Promise<User> {
    return this.usersService.findOne(data.guid);
  }

  /**
   * Update the data of a user.
   * @param guid The id of the user.
   * @param updateUserDto The data that should be updated.
   * @returns A Promise with an empty result.
   */
  @GrpcMethod()
  update(data: UpdateUserDto & GuidDto): Promise<void> {
    return this.usersService.update(data.guid, data);
  }

  /**
   * Delete a user by its id.
   * @param guid The id of the user.
   * @returns A Promise<T> with an empty result.
   */
  @GrpcMethod()
  remove(data: GuidDto): Promise<void> {
    return this.usersService.remove(data.guid);
  }

  /**
   * Execute a simple health check.
   * @returns A Promise<T> with an empty result.
   */
  @GrpcMethod()
  healthCheck(): Promise<void> {
    return new Promise((resolve) => resolve());
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUsersService, USERS_SERVICE } from './interfaces/users.interface';

/**
 * CRUD Controller for users.
 */
@Controller('users')
export class UsersController {
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
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  /**
   * Find all users of the application.
   * @returns A Promise<T> whose result is an array of User.
   */
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   * Get a user by its id.
   * @param guid The id of the user.
   * @returns A Promise<T> whose result is a User.
   */
  @Get(':guid')
  findOne(
    @Param('guid', new ParseUUIDPipe({ version: '4' })) guid: string,
  ): Promise<User> {
    return this.usersService.findOne(guid);
  }

  /**
   * Update the data of a user.
   * @param guid The id of the user.
   * @param updateUserDto The data that should be updated.
   * @returns A Promise with an empty result.
   */
  @Patch(':guid')
  update(
    @Param('guid', new ParseUUIDPipe({ version: '4' })) guid: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return this.usersService.update(guid, updateUserDto);
  }

  /**
   * Delete a user by its id.
   * @param guid The id of the user.
   * @returns A Promise<T> with an empty result.
   */
  @Delete(':guid')
  remove(
    @Param('guid', new ParseUUIDPipe({ version: '4' })) guid: string,
  ): Promise<void> {
    return this.usersService.remove(guid);
  }
}

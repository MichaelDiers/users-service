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
  HttpCode,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { HeaderNames } from '../../header-names';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { IUsersService, USERS_SERVICE } from '../interfaces/users.interface';

/**
 * CRUD Controller for users.
 */
@ApiSecurity(HeaderNames.X_API_KEY)
@Controller('users')
export class UsersHttpController {
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
  @HttpCode(201)
  @ApiOperation({ description: 'Create a new user.' })
  @ApiResponse({
    status: 201,
    description: 'The new user is created.',
    type: User,
  })
  @ApiResponse({ status: 403, description: 'The access is forbidden.' })
  @ApiResponse({ status: 400, description: 'The request is invalid.' })
  @ApiResponse({
    status: 409,
    description: 'An user with given displayName or email already exists.',
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  /**
   * Find all users of the application.
   * @returns A Promise<T> whose result is an array of User.
   */
  @Get()
  @ApiOperation({ description: 'List all existing users.' })
  @ApiResponse({
    status: 200,
    description: 'All users are listed.',
    type: [User],
  })
  @ApiResponse({ status: 403, description: 'The access is forbidden.' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   * Get a user by its id.
   * @param guid The id of the user.
   * @returns A Promise<T> whose result is a User.
   */
  @Get(':guid')
  @ApiOperation({ description: 'Read the data of a certain user.' })
  @ApiParam({
    name: 'guid',
    example: 'efb10bbb-9871-4c2a-ab9d-34c277d61480',
    description: 'The id of the user.',
  })
  @ApiResponse({
    status: 200,
    description: 'The user is found and data is returned.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'The request is invalid.' })
  @ApiResponse({ status: 403, description: 'The access is forbidden.' })
  @ApiResponse({ status: 404, description: 'No user with given id is found.' })
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
  @ApiOperation({ description: 'Update the data of a certain user.' })
  @ApiParam({
    name: 'guid',
    example: 'efb10bbb-9871-4c2a-ab9d-34c277d61480',
    description: 'The id of the user.',
  })
  @ApiResponse({ status: 200, description: 'The user is updated.' })
  @ApiResponse({ status: 400, description: 'The request is invalid.' })
  @ApiResponse({ status: 403, description: 'The access is forbidden.' })
  @ApiResponse({ status: 404, description: 'No user with given id is found.' })
  @ApiResponse({
    status: 409,
    description: 'An user with updated displayName or email already exists.',
  })
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
  @ApiOperation({ description: 'Delete a certain user.' })
  @ApiParam({
    name: 'guid',
    example: 'efb10bbb-9871-4c2a-ab9d-34c277d61480',
    description: 'The id of the user.',
  })
  @ApiResponse({ status: 200, description: 'The user is deleted.' })
  @ApiResponse({ status: 400, description: 'The request is invalid.' })
  @ApiResponse({ status: 403, description: 'The access is forbidden.' })
  @ApiResponse({ status: 404, description: 'No user with given id is found.' })
  remove(
    @Param('guid', new ParseUUIDPipe({ version: '4' })) guid: string,
  ): Promise<void> {
    return this.usersService.remove(guid);
  }
}

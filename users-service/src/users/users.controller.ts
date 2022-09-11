import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    private readonly usersService: UsersService,
  ) {}

  /**
   * Create a new user.
   * @param createUserDto DTO that contains the validated user data.
   * @returns A User entity.
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Find all users of the application.
   * @returns 
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Get a user by its id.
   * @param guid The id of the user.
   * @returns 
   */
  @Get(':guid')
  findOne(@Param('guid', new ParseUUIDPipe({ version: '4' })) guid: string) {
    return this.usersService.findOne(guid);
  }

  /**
   * Update the data of a user.
   * @param guid The id of the user.
   * @param updateUserDto The data that should be updated.
   * @returns 
   */
  @Patch(':guid')
  update(@Param('guid', new ParseUUIDPipe({ version: '4' })) guid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(guid, updateUserDto);
  }

  /**
   * Delete a user by its id.
   * @param guid The id of the user.
   * @returns 
   */
  @Delete(':guid')
  remove(@Param('guid', new ParseUUIDPipe({ version: '4' })) guid: string) {
    return this.usersService.remove(guid);
  }
}

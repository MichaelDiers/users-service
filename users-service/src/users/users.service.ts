import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(guid: string) {
    return `This action returns a #${guid} user`;
  }

  update(guid: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${guid} user`;
  }

  remove(guid: string) {
    return `This action removes a #${guid} user`;
  }
}

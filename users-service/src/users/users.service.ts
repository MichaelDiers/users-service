import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(guid: string) {
    return `This action returns a #${guid} user`;
  }

  update(guid: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${guid} user ${JSON.stringify(
      updateUserDto,
    )}`;
  }

  remove(guid: string) {
    return `This action removes a #${guid} user`;
  }
}

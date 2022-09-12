import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersDatabaseService } from './users-database.service';
import { USERS_DATABASE_SERVICE } from './interfaces/users-database.interface';
import { USERS_SERVICE } from './interfaces/users.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './database/user.schema';

@Module({
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    {
      provide: USERS_SERVICE,
      useClass: UsersService,
    },
    {
      provide: USERS_DATABASE_SERVICE,
      useClass: UsersDatabaseService,
    },
  ],
})
export class UsersModule {}

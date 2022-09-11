import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersDatabaseService } from './users-database.service';
import { USERS_DATABASE_SERVICE } from './users-database.interface';
import { USERS_SERVICE } from './users.interface';

@Module({
  controllers: [UsersController],
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

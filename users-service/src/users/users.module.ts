import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersHttpController } from './controllers/users-http.controller';
import { UsersDatabaseService } from './users-database.service';
import { USERS_DATABASE_SERVICE } from './interfaces/users-database.interface';
import { USERS_SERVICE } from './interfaces/users.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './database/user.schema';
import { GrpcUsersService } from './controllers/users-grpc.controller';
import { UsersTcpController } from './controllers/users-tcp.controller';
import { GuardsModule } from '../guards/guards.module';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
  controllers: [UsersHttpController, GrpcUsersService, UsersTcpController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    GuardsModule,
    ConfigurationModule,
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

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbConfigService } from './services/mongodb-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ServicesModule],
      useClass: MongodbConfigService,
    }),
    ServicesModule,
    UsersModule,
  ],
})
export class AppModule {}

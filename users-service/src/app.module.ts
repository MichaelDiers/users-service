import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { HealthChecksModule } from './health-checks/health-checks.module';
import { ClientsModule } from './clients/clients.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { GuardsModule } from './guards/guards.module';
import { PipesModule } from './pipes/pipes.module';
import { InjectionNames } from './configuration/InjectionNames.enum';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (connectionString: string) => {
        return { uri: connectionString };
      },
      inject: [InjectionNames.CONNECTION_STRING],
      imports: [ConfigurationModule],
    }),
    ServicesModule,
    UsersModule,
    HealthModule,
    HealthChecksModule,
    ClientsModule,
    ConfigurationModule,
    GuardsModule,
    PipesModule,
  ],
})
export class AppModule {}

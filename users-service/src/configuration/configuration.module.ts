import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { EnvNames } from './env-names';
import { LoggingModule } from '../logging/logging.module';
import { InjectionNames } from './InjectionNames.enum';
import { SecretManagerService } from './secret-manager.service';
import { DocumentBuilder } from '@nestjs/swagger';
import { HeaderNames } from '../header-names';

@Module({
  exports: [
    InjectionNames.API_KEY,
    InjectionNames.GRPC_CONFIG,
    InjectionNames.TCP_CONFIG,
    InjectionNames.USE_SWAGGER,
    InjectionNames.HASH_ROUNDS,
    InjectionNames.PROJECT_NAME,
    InjectionNames.SECRETS_FROM_ENV,
    InjectionNames.CONNECTION_STRING,
    InjectionNames.SWAGGER_CONFIG,
    InjectionNames.HEALTH_CHECK_DOCUMENTATION_ADDRESS,
    InjectionNames.HEALTH_CHECK_REST_ADDRESS,
  ],
  imports: [ConfigModule.forRoot({}), LoggingModule],
  providers: [
    SecretManagerService,
    {
      provide: InjectionNames.API_KEY,
      useFactory: async (
        secretsFromEnv: boolean,
        configService: ConfigService,
        secretManagerService: SecretManagerService,
      ): Promise<string> => {
        if (secretsFromEnv) {
          return configService.getOrThrow(EnvNames.API_KEY);
        }

        return secretManagerService.getApiKey();
      },
      inject: [InjectionNames.SECRETS_FROM_ENV, ConfigService, SecretManagerService],
    },
    {
      provide: InjectionNames.CONNECTION_STRING,
      useFactory: async (
        secretsFromEnv: boolean,
        configService: ConfigService,
        secretManagerService: SecretManagerService,
      ): Promise<string> => {
        if (secretsFromEnv) {
          return configService.getOrThrow(EnvNames.CONNECTION_STRING);
        }

        return secretManagerService.getConnectionString();
      },
      inject: [
        InjectionNames.SECRETS_FROM_ENV,
        ConfigService,
        SecretManagerService,
      ],
    },
    {
      provide: InjectionNames.GRPC_CONFIG,
      useFactory: (configService: ConfigService) => {
        const port = configService.getOrThrow(EnvNames.GRPC_PORT);
        return {
          transport: Transport.GRPC,
          options: {
            package: ['users'],
            protoPath: [join(__dirname, '../proto/users.proto')],
            url: `0.0.0.0:${port}`,
          },
        };
      },
      inject: [ConfigService],
    },
    {
      provide: InjectionNames.HASH_ROUNDS,
      useFactory: (configService: ConfigService): number => {
        const rounds = configService.getOrThrow(EnvNames.HASH_ROUNDS);
        return parseInt(rounds);
      },
      inject: [ConfigService],
    },
    {
      provide: InjectionNames.HEALTH_CHECK_DOCUMENTATION_ADDRESS,
      useFactory: (configService: ConfigService): number => {
        return configService.getOrThrow(
          EnvNames.HEALTH_CHECK_DOCUMENTATION_ADDRESS,
        );
      },
      inject: [ConfigService],
    },
    {
      provide: InjectionNames.HEALTH_CHECK_REST_ADDRESS,
      useFactory: (configService: ConfigService): number => {
        return configService.getOrThrow(EnvNames.HEALTH_CHECK_REST_ADDRESS);
      },
      inject: [ConfigService],
    },
    {
      provide: InjectionNames.PROJECT_NAME,
      useFactory: (configService: ConfigService): string => {
        return configService.getOrThrow(EnvNames.PROJECT_NAME);
      },
      inject: [ConfigService],
    },
    {
      provide: InjectionNames.SECRETS_FROM_ENV,
      useFactory: (configService: ConfigService): boolean => {
        const value = configService.get(EnvNames.SECRETS_FROM_ENV);
        return value ? true : false;
      },
      inject: [ConfigService],
    },
    {
      provide: InjectionNames.SWAGGER_CONFIG,
      useFactory: () => {
        return new DocumentBuilder()
          .setTitle('UsersService')
          .setDescription('The api of the users service.')
          .setVersion('1.0')
          .addTag('users')
          .addApiKey(
            { type: 'apiKey', name: HeaderNames.X_API_KEY, in: 'header' },
            HeaderNames.X_API_KEY,
          )
          .build();
      },
    },
    {
      provide: InjectionNames.TCP_CONFIG,
      useFactory: (configService: ConfigService): any => {
        const port = configService.getOrThrow(EnvNames.TCP_PORT);
        return {
          transport: Transport.TCP,
          options: {
            host: '0.0.0.0',
            port,
          },
        };
      },
      inject: [ConfigService],
    },
    {
      provide: InjectionNames.USE_SWAGGER,
      useFactory: (configService: ConfigService): boolean => {
        const value = configService.getOrThrow(EnvNames.USE_SWAGGER);
        return value ? true : false;
      },
      inject: [ConfigService],
    },
  ],
})
export class ConfigurationModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { LoggingModule } from '../logging/logging.module';
import { InjectionNames } from './InjectionNames.enum';
import { SecretManagerService } from './secret-manager.service';
import { DocumentBuilder } from '@nestjs/swagger';
import { HeaderNames } from '../header-names';

/**
 * Prefix for environment variables.
 */
const USERS_SERVICE_PREFIX = 'USERS_SERVICE_';

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
    InjectionNames.REST_PORT,
    InjectionNames.GRPC_PORT,
    InjectionNames.TCP_PORT,
  ],
  imports: [ConfigModule.forRoot({}), LoggingModule],
  providers: [
    SecretManagerService,
    {
      provide: InjectionNames.API_KEY,
      useFactory: async (configService: ConfigService): Promise<string> => {
        return configService.getOrThrow(
          `${USERS_SERVICE_PREFIX}${InjectionNames.API_KEY}`,
        );
      },
      inject: [ConfigService],
    },
    {
      provide: InjectionNames.CONNECTION_STRING,
      useFactory: async (
        secretsFromEnv: boolean,
        configService: ConfigService,
        secretManagerService: SecretManagerService,
      ): Promise<string> => {
        if (secretsFromEnv) {
          return configService.getOrThrow(
            `${USERS_SERVICE_PREFIX}${InjectionNames.CONNECTION_STRING}`,
          );
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
      provide: InjectionNames.HASH_ROUNDS,
      useFactory: (configService: ConfigService): number => {
        const rounds = configService.getOrThrow(
          `${USERS_SERVICE_PREFIX}${InjectionNames.HASH_ROUNDS}`,
        );
        return parseInt(rounds);
      },
      inject: [ConfigService],
    },
    {
      provide: InjectionNames.PROJECT_NAME,
      useFactory: (configService: ConfigService): string => {
        return configService.getOrThrow(
          `${USERS_SERVICE_PREFIX}${InjectionNames.PROJECT_NAME}`,
        );
      },
      inject: [ConfigService],
    },
    {
      provide: InjectionNames.SECRETS_FROM_ENV,
      useFactory: (configService: ConfigService): boolean => {
        const value = configService.get(
          `${USERS_SERVICE_PREFIX}${InjectionNames.SECRETS_FROM_ENV}`,
        );
        return value ? true : false;
      },
      inject: [ConfigService],
    },
    {
      provide: InjectionNames.REST_PORT,
      useFactory: (configService: ConfigService): number => {
        return parseInt(
          configService.getOrThrow(
            `${USERS_SERVICE_PREFIX}${InjectionNames.REST_PORT}`,
          ),
        );
      },
      inject: [ConfigService],
    },
    {
      provide: InjectionNames.GRPC_PORT,
      useFactory: (configService: ConfigService): number => {
        return parseInt(
          configService.getOrThrow(
            `${USERS_SERVICE_PREFIX}${InjectionNames.GRPC_PORT}`,
          ),
        );
      },
      inject: [ConfigService],
    },
    {
      provide: InjectionNames.TCP_PORT,
      useFactory: (configService: ConfigService): number => {
        return parseInt(
          configService.getOrThrow(
            `${USERS_SERVICE_PREFIX}${InjectionNames.TCP_PORT}`,
          ),
        );
      },
      inject: [ConfigService],
    },
    {
      provide: InjectionNames.HEALTH_CHECK_REST_ADDRESS,
      useFactory: (configService: ConfigService, restPort: number): string => {
        const pre = configService.getOrThrow(
          `${USERS_SERVICE_PREFIX}${InjectionNames.HEALTH_CHECK_REST_ADDRESS}_PRE`,
        );
        const post = configService.getOrThrow(
          `${USERS_SERVICE_PREFIX}${InjectionNames.HEALTH_CHECK_REST_ADDRESS}_POST`,
        );
        return `${pre}${restPort}${post}`;
      },
      inject: [ConfigService, InjectionNames.REST_PORT],
    },
    {
      provide: InjectionNames.HEALTH_CHECK_DOCUMENTATION_ADDRESS,
      useFactory: (configService: ConfigService): string => {
        return configService.getOrThrow(
          `${USERS_SERVICE_PREFIX}${InjectionNames.HEALTH_CHECK_DOCUMENTATION_ADDRESS}`,
        );
      },
      inject: [ConfigService],
    },
    {
      provide: InjectionNames.USE_SWAGGER,
      useFactory: (configService: ConfigService): boolean => {
        const value = configService.get(
          `${USERS_SERVICE_PREFIX}${InjectionNames.USE_SWAGGER}`,
        );
        return value ? true : false;
      },
      inject: [ConfigService],
    },
    /**
     * NON ENV VALUES
     */
    {
      provide: InjectionNames.GRPC_CONFIG,
      useFactory: (configService: ConfigService, port: number) => {
        return {
          transport: Transport.GRPC,
          options: {
            package: ['users'],
            protoPath: [join(__dirname, '../proto/users.proto')],
            url: `0.0.0.0:${port}`,
          },
        };
      },
      inject: [ConfigService, InjectionNames.GRPC_PORT],
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
      useFactory: (configService: ConfigService, port: number): any => {
        return {
          transport: Transport.TCP,
          options: {
            host: '0.0.0.0',
            port,
          },
        };
      },
      inject: [ConfigService, InjectionNames.TCP_PORT],
    },
  ],
})
export class ConfigurationModule {}

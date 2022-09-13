import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { EnvNames } from '../env-names';

/**
 * Create the configuration for the grpc service.
 * @param config Access to the application configuration.
 * @returns The configuration used for the grpc service.
 */
export default function grpcConfig(
  config?: ConfigService,
): NestApplicationContextOptions & MicroserviceOptions {
  const port = config ? config.getOrThrow(EnvNames.GRPC_PORT) : 3020;
  return {
    transport: Transport.GRPC,
    options: {
      package: 'users',
      protoPath: join(__dirname, '../proto/users.proto'),
      url: `localhost:${port}`,
    },
  };
}

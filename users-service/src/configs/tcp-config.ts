import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EnvNames } from '../env-names';

/**
 * Create the configuration for the tcp service.
 * @param config Access to the application configuration.
 * @returns The configuration used for the tcp service.
 */
export default function tcpConfig(
  config?: ConfigService,
): NestApplicationContextOptions & MicroserviceOptions {
  const port = config ? config.getOrThrow(EnvNames.TCP_PORT) : 3001;
  return {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port,
    },
  };
}

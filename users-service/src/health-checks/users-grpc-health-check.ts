import { Inject, Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { InjectionNames } from '../configuration/InjectionNames.enum';
import IUsersClient from '../users/interfaces/users-client.interface';

/**
 * A custom health indicator for the grpc users service.
 */
@Injectable()
export class UsersGrpcHealthCheck extends HealthIndicator {
  /**
   * Creates a new instance of UsersGrpcHealthCheck.
   * @param grpcUsersClient The grpc client for the users service.
   */
  constructor(
    @Inject(InjectionNames.GRPC_USERS_CLIENT)
    private readonly grpcUsersClient: IUsersClient,
  ) {
    super();
  }

  /**
   * Execute a health check for the grpc users service.
   * @param key The key which will be used as key for the result object.
   * @returns The health status of the service.
   */
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.grpcUsersClient.healthCheck();
      return this.getStatus(key, true, { info: 'Up and running' });
    } catch (err) {
      throw new HealthCheckError(
        'Custom health check failed',
        this.getStatus(key, false, {
          info: 'service is down',
          error: err.message,
        }),
      );
    }
  }
}

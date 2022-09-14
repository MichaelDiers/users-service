import { Controller, Get, Inject } from '@nestjs/common';
import {
  MongooseHealthIndicator,
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  MicroserviceHealthIndicator,
  HealthCheckResult,
} from '@nestjs/terminus';
import { HeaderNames } from '../header-names';
import { UsersGrpcHealthCheck } from '../health-checks/users-grpc-health-check';
import { InjectionNames } from '../configuration/InjectionNames.enum';

/**
 * A controller for checking the application health.
 */
@Controller('health')
export class HealthController {
  /**
   * Creates a new instance of HealthController.
   * @param healthCheckService Service for checking the application health.
   * @param httpHealthIndicator Http-based health checks.
   * @param microserviceHealthIndicator Check the health of microservices.
   * @param mongooseHealthIndicator Check the health of the mongodb.
   * @param usersGrpcHealthCheck Check the health of the user service using grpc.
   * @param tcpConfig The tcp cofiguration of the users service.
   * @param apiKey The api key that used for requests.
   * @param healthCheckRestAddress The address for the rest health check.
   * @param healthCheckDocumentationAddress The address of the users service documentation.
   */
  constructor(
    private healthCheckService: HealthCheckService,
    private httpHealthIndicator: HttpHealthIndicator,
    private microserviceHealthIndicator: MicroserviceHealthIndicator,
    private mongooseHealthIndicator: MongooseHealthIndicator,
    private usersGrpcHealthCheck: UsersGrpcHealthCheck,
    @Inject(InjectionNames.TCP_CONFIG) private readonly tcpConfig: any,
    @Inject(InjectionNames.API_KEY) private readonly apiKey: string,
    @Inject(InjectionNames.HEALTH_CHECK_REST_ADDRESS)
    private readonly healthCheckRestAddress: string,
    @Inject(InjectionNames.HEALTH_CHECK_DOCUMENTATION_ADDRESS)
    private readonly healthCheckDocumentationAddress: string,
  ) {}

  /**
   * Execute health checks for the application.
   * @returns The health status of the server.
   */
  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    const options = { headers: {} };
    options.headers[HeaderNames.X_API_KEY] = this.apiKey;

    return this.healthCheckService.check([
      async () =>
        this.microserviceHealthIndicator.pingCheck('tcp', this.tcpConfig),
      () =>
        this.httpHealthIndicator.pingCheck(
          'Users Service API Doc',
          this.healthCheckDocumentationAddress,
        ),
      async () => this.mongooseHealthIndicator.pingCheck('mongoose'),
      async () =>
        this.httpHealthIndicator.pingCheck(
          'Users Service',
          this.healthCheckRestAddress,
          options,
        ),
      async () => this.usersGrpcHealthCheck.isHealthy('Grpc Users'),
    ]);
  }
}

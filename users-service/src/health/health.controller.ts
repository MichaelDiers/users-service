import { Controller, Get, Inject } from '@nestjs/common';
import {
  MongooseHealthIndicator,
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  HealthCheckResult,
} from '@nestjs/terminus';
import { HeaderNames } from '../header-names';
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
   * @param mongooseHealthIndicator Check the health of the mongodb.
   * @param apiKey The api key that used for requests.
   * @param healthCheckRestAddress The address for the rest health check.
   * @param healthCheckDocumentationAddress The address of the users service documentation.
   */
  constructor(
    private healthCheckService: HealthCheckService,
    private httpHealthIndicator: HttpHealthIndicator,
    private mongooseHealthIndicator: MongooseHealthIndicator,
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
        this.httpHealthIndicator.pingCheck(
          'Users Service REST',
          this.healthCheckRestAddress,
          options,
        ),
      async () =>
        this.mongooseHealthIndicator.pingCheck('Users Service Database'),
      () =>
        this.httpHealthIndicator.pingCheck(
          'Users Service Documenation',
          this.healthCheckDocumentationAddress,
        ),
    ]);
  }
}

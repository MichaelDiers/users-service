import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { EnvNames } from '../env-names';
import ApiKeyDto from '../users/dto/api-key.dto';

/**
 * Guard for validating the provided api key for tcp services.
 */
@Injectable()
export class ApiKeyTcpGuard implements CanActivate {
  /**
   * The expected api key for the service.
   */
  private serviceApiKey: string;

  /**
   * Create a new instance of ApiKeyGuard.
   * @param configService Access to the application configuration.
   */
  constructor(private readonly configService: ConfigService) {}

  /**
   * Validate the provided api key of the request.
   * @param context The current execution context.
   * @returns True if the api key is valid and false otherwise.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const apiKey = this.readApiKey(context);

    if (!apiKey) {
      return false;
    }

    if (!this.serviceApiKey) {
      this.serviceApiKey = this.configService.get(EnvNames.API_KEY);
    }

    return this.serviceApiKey === apiKey;
  }

  /**
   * Read the api key from http and rcp requests.
   * @param context The current execution context.
   * @returns The api key if it is included in the request and undefined otherwise.
   */
  private readApiKey(context: ExecutionContext): string | undefined {
    const data = context.getArgs().find((args) => (args as ApiKeyDto).apiKey);
    if (data) {
      return (data as ApiKeyDto).apiKey;
    }

    return;
  }
}

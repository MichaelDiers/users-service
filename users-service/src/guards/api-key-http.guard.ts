import { Injectable, ExecutionContext, Inject } from '@nestjs/common';
import { InjectionNames } from '../configuration/InjectionNames.enum';
import { HeaderNames } from '../header-names';
import { ApiKeyGuard } from './api-key.guard';

/**
 * Guard for validating the provided api key for http services.
 */
@Injectable()
export class ApiKeyHttpGuard extends ApiKeyGuard {
  /**
   * Create a new instance of ApiKeyGuard.
   * @param apiKey A valid api key.
   */
  constructor(@Inject(InjectionNames.API_KEY) serviceApiKey: string) {
    super(serviceApiKey);
  }

  /**
   * Read the api key from http and rcp requests.
   * @param context The current execution context.
   * @returns The api key if it is included in the request and undefined otherwise.
   */
  protected readApiKey(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const headers = request?.headers;

    if (!headers) {
      return;
    }

    return headers[HeaderNames.X_API_KEY];
  }
}

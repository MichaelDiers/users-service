import { Injectable, ExecutionContext, Inject } from '@nestjs/common';
import { HeaderNames } from '../header-names';
import { Metadata } from '@grpc/grpc-js';
import { InjectionNames } from '../configuration/InjectionNames.enum';
import { ApiKeyGuard } from './api-key.guard';

/**
 * Guard for validating the provided api key in GRPC context.
 */
@Injectable()
export class ApiKeyGrpcGuard extends ApiKeyGuard {
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
    const metadata: Metadata = context
      .getArgs()
      .find((arg) => arg instanceof Metadata);
    if (!metadata) {
      return;
    }

    const apiKeys = metadata.get(HeaderNames.X_API_KEY);
    if (!apiKeys || apiKeys.length !== 1) {
      return;
    }

    return apiKeys[0].toString();
  }
}

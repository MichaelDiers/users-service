import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * Base guard for validating api keys.
 */
@Injectable()
export abstract class ApiKeyGuard implements CanActivate {
  /**
   * Create a new instance of ApiKeyGuard.
   * @param apiKey A valid api key.
   */
  constructor(private readonly serviceApiKey: string) {}

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

    return this.serviceApiKey === apiKey;
  }

  /**
   * Read the api key from requests.
   * @param context The current execution context.
   * @returns The api key if it is included in the request and undefined otherwise.
   */
  protected abstract readApiKey(context: ExecutionContext): string | undefined;
}

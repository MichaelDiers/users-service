import { Injectable } from '@nestjs/common';
import { ILoggingService } from './logging.interface';

/**
 * Describes a logger service.
 */
@Injectable()
export default class LoggingService implements ILoggingService {
  /**
   * Log an error.
   * @param message The message of the error.
   * @param stack The stack of the error.
   */
  logError(message: string, stack?: string): void {
    console.log(message);
    console.log(stack);
  }
}
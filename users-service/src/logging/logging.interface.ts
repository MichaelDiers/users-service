/**
 * Used for dependency injection.
 */
export const LOGGING_SERVICE = 'LOGGING_SERVICE';

/**
 * Describes a logger service.
 */
export interface ILoggingService {
  /**
   * Log an error.
   * @param message The message of the error.
   * @param stack The stack of the error.
   */
  logError(message: string, stack?: string): void;
}

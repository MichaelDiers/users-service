/**
 * Used for dependency injection.
 */
export const SECRET_MANAGER_SERVICE = 'SECRET_MANAGER_SERVICE';

/**
 * Access for the google cloud secret manager.
 */
export interface ISecretManagerService {
  /**
   * Get the mongodb connection string.
   */
  getConnectionString(): Promise<string | undefined>;
}

import { UUIDVersion } from 'class-validator';

/**
 * Predefined validation constants.
 */
export const Constants = {
  /**
   * The minimum length for display names.
   */
  DISPLAY_NAME_MIN_LENGTH: 3,

  /**
   * The maximum length for display names.
   */
  DISPLAY_NAME_MAX_LENGTH: 256,

  /**
   * The minimum length for emails.
   */
  EMAIL_MIN_LENGTH: 5,

  /**
   * The maximum length for emails.
   */
  EMAIL_MAX_LENGTH: 2048,

  /**
   * The minimum length for passwords.
   */
  PASSWORD_MIN_LENGTH: 8,

  /**
   * The maximum length for passwords.
   */
  PASSWORD_MAX_LENGTH: 4096,

  /**
   * The expected version for uuids.
   */
  UUID_VERSION: '4' as UUIDVersion,
};

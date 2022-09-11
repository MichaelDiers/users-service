import { UUIDVersion } from "class-validator";

export const Constants = {
    DISPLAY_NAME_MIN_LENGTH: 3,
    DISPLAY_NAME_MAX_LENGTH: 256,
    EMAIL_MIN_LENGTH: 5,
    EMAIL_MAX_LENGTH: 2048,
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 4096,
    UUID_VERSION: '4' as UUIDVersion,
}

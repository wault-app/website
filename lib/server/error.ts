export const errors = {
    "unexcepted_error": "Unexcepted error",
    "uuid_already_used": "UUID is already in use",
    "invalid_refresh_token": "Invalid refresh token",
    "jwt_token_expired": "JSON Web Token expired",
    "jwt_token_invalid": "JSON Web Token is invalid",
    "vault_not_found": "Vault could not be found",
    "forbidden": "Forbidden",
    "not_logged_in": "You are not logged in!",
    "authentication_code_expired": "Authentication code has already expired",
    "service_unavailable": "We could not reach the remote servers",
    "username_already_used": "This username is already used",
    "invalid_secret": "This secret is invalid",
    "device_not_found": "We could not find this device. Perhaps it was removed before.",
};

export type ErrorType = keyof typeof errors;

/**
 * Class to handle errors that is thrown 
 */
export default class WrapperError extends Error {
    public data: any;
    
    constructor(err: ErrorType, data?: any) {
        super(err);
        this.data = data;
    }
}
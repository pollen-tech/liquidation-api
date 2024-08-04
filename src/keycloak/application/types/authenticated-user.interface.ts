export interface KcAuthenticatedUser {
    exp: number;
    iat: number;
    auth_time: number;
    jti: string;
    iss: string;
    aud: string;
    sub: string; // id
    typ: string;
    azp: string;
    nonce: string;
    session_state: string;
    acr: string;
    resource_access: Record<string, unknown>; // not clear
    scope: string;
    sid: string;
    email_verified?: boolean;
    name?: string;
    preferred_username?: string;
    given_name?: string;
    family_name?: string;
    email?: string;
}

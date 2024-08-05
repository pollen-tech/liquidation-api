export enum RequiredActionAlias {
    VERIFY_EMAIL = 'VERIFY_EMAIL',
    UPDATE_PROFILE = 'UPDATE_PROFILE',
    CONFIGURE_TOTP = 'CONFIGURE_TOTP',
    UPDATE_PASSWORD = 'UPDATE_PASSWORD',
    TERMS_AND_CONDITIONS = 'TERMS_AND_CONDITIONS',
}

export interface UserConsentRepresentation {
    clientId?: string;
    createDate?: string;
    grantedClientScopes?: string[];
    lastUpdatedDate?: number;
}

export interface CredentialRepresentation {
    createdDate?: number;
    credentialData?: string;
    id?: string;
    priority?: number;
    secretData?: string;
    temporary?: boolean;
    type?: string;
    userLabel?: string;
    value?: string;
}

export interface FederatedIdentityRepresentation {
    identityProvider?: string;
    userId?: string;
    userName?: string;
}

export interface UserRepresentation {
    id?: string;
    createdTimestamp?: number;
    username?: string;
    enabled?: boolean;
    totp?: boolean;
    emailVerified?: boolean;
    disableableCredentialTypes?: string[];
    requiredActions?: (RequiredActionAlias | string)[];
    notBefore?: number;
    access?: Record<string, boolean>;
    attributes?: Record<string, any>;
    clientConsents?: UserConsentRepresentation[];
    clientRoles?: Record<string, any>;
    credentials?: CredentialRepresentation[];
    email?: string;
    federatedIdentities?: FederatedIdentityRepresentation[];
    federationLink?: string;
    firstName?: string;
    groups?: string[];
    lastName?: string;
    origin?: string;
    realmRoles?: string[];
    self?: string;
    serviceAccountClientId?: string;
}

import { Injectable } from '@nestjs/common';
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';
import { KeycloakConfigGetter } from 'src/config/getters/keycloak-config.getter';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
    constructor(private readonly kcConfig: KeycloakConfigGetter) {}

    createKeycloakConnectOptions(): KeycloakConnectOptions {
        return {
            authServerUrl: this.kcConfig.authServerUrl,
            realm: this.kcConfig.realm,
            clientId: this.kcConfig.clientId,
            secret: this.kcConfig.clientSecret,
            policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
            tokenValidation: TokenValidation.ONLINE,
        };
    }
}

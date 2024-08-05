import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { KeycloakConfigService } from './keycloak-config.service';

export const getKeycloakModule = () =>
    KeycloakConnectModule.registerAsync({
        useClass: KeycloakConfigService,
    });

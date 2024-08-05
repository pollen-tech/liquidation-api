import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Injectable()
export class KeycloakConfigGetter {
    constructor(private readonly configService: ConfigService) {}

    static validationSchema = {
        KEYCLOAK_AUTH_SERVER_URL: Joi.string().uri().required(),
        KEYCLOAK_REALM: Joi.string().required(),
        KEYCLOAK_CLIENT_ID: Joi.string().required(),
        KEYCLOAK_CLIENT_SECRET: Joi.string().required(),
    };

    get authServerUrl() {
        return this.configService.get<string>('KEYCLOAK_AUTH_SERVER_URL');
    }

    get realm() {
        return this.configService.get<string>('KEYCLOAK_REALM');
    }

    get clientId() {
        return this.configService.get<string>('KEYCLOAK_CLIENT_ID');
    }

    get clientSecret() {
        return this.configService.get<string>('KEYCLOAK_CLIENT_SECRET');
    }
}

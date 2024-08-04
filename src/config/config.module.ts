import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { PostgresConfigGetter } from './getters/postgres-config.getter';
import { KeycloakConfigGetter } from './getters/keycloak-config.getter';

const configGetters = [PostgresConfigGetter, KeycloakConfigGetter];

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['build/env/.env'],
            isGlobal: true,
            validationSchema: Joi.object({
                API_PORT: Joi.number().default(3001),
                ...PostgresConfigGetter.validationSchema,
            }),
        }),
    ],
    providers: configGetters,
    exports: [ConfigModule, ...configGetters],
})
export class CustomConfigModule {}

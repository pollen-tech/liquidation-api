import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { PostgresConfigGetter } from './getters/postgres-config.getter';
import { KeycloakConfigGetter } from './getters/keycloak-config.getter';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

const configGetters = [PostgresConfigGetter, KeycloakConfigGetter];

const APPLICATION_ENV = process.env.APP_ENV || 'sandbox';
const ENV_FILE_PATH = 'build/env/.env.' + APPLICATION_ENV.toLowerCase() || 'build/env/.env';

console.log('Application Running Env : ' + APPLICATION_ENV);

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [ENV_FILE_PATH],
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
export class CustomConfigModule {
    constructor(private dataSource: DataSource) {
        addTransactionalDataSource(this.dataSource);
    }
}

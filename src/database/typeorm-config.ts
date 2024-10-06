import * as path from 'path';
import {PostgresConfigGetter} from 'src/config/getters/postgres-config.getter';

export const getTypeOrmConfig = (config?: PostgresConfigGetter) => {
    const app_env = process.env.APP_ENV;
    console.log('ENV -', app_env);
    const orm_config = {
        type: 'postgres',
        host: config?.host || process.env.POSTGRES_HOST,
        port: config?.port || process.env.POSTGRES_PORT,
        username: config?.user || process.env.POSTGRES_USER,
        password: config?.password || process.env.POSTGRES_PASSWORD,
        database: config?.db || process.env.POSTGRES_DB,
        entities: [path.resolve(__dirname, '../**/*.entity.{ts,js}')],
        migrations: [path.resolve(__dirname, 'migrations/*{.ts,.js}')],
        seeds: [path.resolve(__dirname, 'seeds/postgres/*{.ts,.js}')],
        synchronize: false,
        logging: config?.logging || process.env.POSTGRES_LOGGING,
        logger: 'advanced-console',
        subscribers: [],
        poolSize: 10
    };

    if (['local', 'test'].indexOf(app_env.toLowerCase()) === -1) {
        orm_config.synchronize = false;
        orm_config['ssl'] = {rejectUnauthorized: false};
    }
    return orm_config;
};

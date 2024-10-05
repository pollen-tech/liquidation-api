import * as path from 'path';
import { PostgresConfigGetter } from 'src/config/getters/postgres-config.getter';

export const getTypeOrmConfig = (config?: PostgresConfigGetter) => {
    const c = {
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
        poolSize: 10,
        // ssl: {
        //    rejectUnauthorized: false,
        // },
    };
    return c;
};

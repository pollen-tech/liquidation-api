import { NestFactory } from '@nestjs/core';
import { PostgresConfigGetter } from 'src/config/getters/postgres-config.getter';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { DatabaseModule } from './database.module';
import { getTypeOrmConfig } from './typeorm-config';

export const getTypeOrmInstance = async () => {
    const app = await NestFactory.create(DatabaseModule.forRoot());
    const config = app.get(PostgresConfigGetter);
    const ormConfig = new DataSource(getTypeOrmConfig(config) as DataSourceOptions);
    return ormConfig.initialize();
};

export async function runMigrations() {
    const typeorm = await getTypeOrmInstance();
    await typeorm.runMigrations();
}

export async function runSeeds() {
    const typeorm = await getTypeOrmInstance();
    await runSeeders(typeorm);
}

export async function revertMigration() {
    const typeorm = await getTypeOrmInstance();
    await typeorm.undoLastMigration();
}

export const OrmConfig = new DataSource(getTypeOrmConfig() as DataSourceOptions);

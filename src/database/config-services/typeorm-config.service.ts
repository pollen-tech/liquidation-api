import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { PostgresConfigGetter } from '../../config/getters/postgres-config.getter';
import { getTypeOrmConfig } from '../typeorm-config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly pgConfig: PostgresConfigGetter) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        const config = getTypeOrmConfig(this.pgConfig) as TypeOrmModuleOptions;
        return { ...config, autoLoadEntities: true };
    }
}

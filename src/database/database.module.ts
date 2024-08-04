import { DynamicModule, Provider } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TYPEORM_EX_CUSTOM_REPOSITORY } from './decorators/custom-repository.decorator';
import { DatabaseHealthcheckService } from './database-healthcheck.service';
import { CustomConfigModule } from '../config/config.module';
import { TypeOrmConfigService } from './config-services/typeorm-config.service';

export class DatabaseModule {
    static forRoot(): DynamicModule {
        const providers = [DatabaseHealthcheckService];
        return {
            imports: [CustomConfigModule, TerminusModule, TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService })],
            providers,
            global: true,
            module: DatabaseModule,
            exports: providers,
        };
    }

    public static forCustomRepository<T extends new (...args: any[]) => any>(repositories: T[]): DynamicModule {
        const providers: Provider[] = [];

        for (const repository of repositories) {
            const entity = Reflect.getMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, repository);

            if (!entity) {
                continue;
            }

            providers.push({
                inject: [getDataSourceToken()],
                provide: repository,
                useFactory: (dataSource: DataSource): typeof repository => {
                    const baseRepository = dataSource.getRepository<any>(entity);
                    return new repository(baseRepository.target, baseRepository.manager, baseRepository.queryRunner);
                },
            });
        }

        return {
            exports: providers,
            module: DatabaseModule,
            providers,
        };
    }
}

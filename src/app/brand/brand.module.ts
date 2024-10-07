import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BrandController} from './controllers/brand.controller';
import {BrandService} from './domain/brand.service';
import {BrandEntity} from './repositories/brand.entity';
import {BrandRepository} from './repositories/brand.repository';

import {DatabaseModule} from '../../database/database.module';
import {BrandCategoryRepository} from './repositories/brand.category.repository';
import {BrandCategoryEntity} from './repositories/brand.category.entity';
import {BrandCompactService} from "./domain/BrandCompactService";

let repositories: any[] = [BrandRepository, BrandCategoryRepository];

@Module({
    imports: [TypeOrmModule.forFeature([BrandEntity, BrandCategoryEntity]), DatabaseModule.forCustomRepository(repositories)],
    providers: [BrandService, BrandCompactService],
    controllers: [BrandController],
    exports: [TypeOrmModule, BrandService],
})
export class BrandModule {
}

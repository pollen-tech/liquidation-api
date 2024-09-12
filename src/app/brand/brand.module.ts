import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { BrandController } from './controllers/brand.controller';
import { BrandService } from './domain/brand.service';
import { BrandEntity } from './repositories/brand.entity';
import { BrandRepository } from './repositories/brand.repository';

import { BrandCategoryEntity } from './repositories/brand.category.entity';
import { BrandCategoryRepository } from './repositories/brand.category.repository';

let repositories: any[] = [BrandRepository, BrandCategoryRepository];

@Module({
	imports: [
		TypeOrmModule.forFeature([BrandEntity, BrandCategoryEntity]),
		DatabaseModule.forCustomRepository(repositories),
	],
	providers: [BrandService],
	controllers: [BrandController],
	exports: [TypeOrmModule, BrandService],
})
export class BrandModule { }

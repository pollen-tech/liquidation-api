import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './repositories/brand.entity';
import { BrandController } from './controllers/brand.controller';
import { BrandService } from './domain/brand.service';

@Module({
	imports: [TypeOrmModule.forFeature([BrandEntity])],
	providers: [BrandService],
	controllers: [BrandController],
	exports: [TypeOrmModule, BrandService],
})
export class BrandModule { }

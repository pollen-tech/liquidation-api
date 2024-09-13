import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { BrandService } from '../domain/brand.service';
import { NewBrandDto } from '../dto/brand.dto';
import { BrandEntity } from '../repositories/brand.entity';
import { BrandCategoryEntity } from '../repositories/brand.category.entity';

@ApiTags('Brand')
@Controller('brand')
@Public()

export class BrandController {
	constructor(private readonly brandService: BrandService) { }

	@Post()
	createBrand(@Body() reqDto: NewBrandDto) {
		return this.brandService.createBrand(reqDto);
	}

	@Get()
	findAllBrands(): Promise<BrandEntity[]> {
		return this.brandService.findAllBrands();
	}

	@Get(':id')
	findBrandwithBrandId(@Param('id') id: string): Promise<BrandEntity> {
		return this.brandService.findBrandwithBrandId(id);
	}

	@Get(':id/brand_category')
	findBrandCategorywithBrandId(@Param('id') id: string): Promise<BrandCategoryEntity[]> {
		return this.brandService.findBrandCategorywithBrandId(id);
	}

	@Put(':id')
	updateBrand(@Param('id') id: string, @Body() updateBrandDto: NewBrandDto): Promise<BrandEntity> {
		return this.brandService.updateBrand(id, updateBrandDto);
	}

	@Delete(':id')
	softDelete(@Param('id') id: string): Promise<void> {
		return this.brandService.softDelete(id);
	}
}

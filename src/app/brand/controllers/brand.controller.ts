import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { BrandService } from '../domain/brand.service';
import { BrandDtoRes, NewBrandDto } from '../dto/brand.dto';
import { BrandEntity } from '../repositories/brand.entity';
import { BrandCategoryEntity } from '../repositories/brand.category.entity';

@ApiTags('Brand')
@Controller('brand')
@Public()
export class BrandController {
	constructor(private readonly brandService: BrandService) { }

	@Post()
	async createBrand(@Body() reqDto: NewBrandDto) {
		return this.createApiRes(await this.brandService.createBrand(reqDto));
	}

	@Get()
	async findAllActiveBrands() {
		return this.createApiRes(await this.brandService.findAllBrands());
	}

	@Get("/id_and_name_only")
	async findAllActiveWithIdAndNameOnly
		() {
		return this.createApiRes(await this.brandService.findAllBrandsWithIdAndNameOnly());
	}

	@Get(':id')
	async findBrandById(@Param('id') id: string) {
		return this.createApiRes(await this.brandService.findByBrandId(id));
	}

	@Get(':id/brand_category')
	async findBrandCategoryByBrandId(@Param('id') id: string) {
		return this.createApiRes(await this.brandService.findBrandCategorywithBrandId(id));
	}

	@Put(':id')
	async updateBrand(@Param('id') id: string, @Body() updateBrandDto: NewBrandDto) {
		return this.createApiRes(await this.brandService.updateBrand(id, updateBrandDto));
	}

	@Delete(':id')
	softDeleteBrand(@Param('id') id: string): Promise<void> {
		return this.brandService.softDeleteBrand(id);
	}

	createApiRes(data: BrandDtoRes | BrandDtoRes[] | any) {
		return {
			status_code: 'OK',
			data: data,
		};
	}
}

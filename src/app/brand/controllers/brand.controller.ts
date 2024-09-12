import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { BrandService } from '../domain/brand.service';
import { NewBrandDto } from '../dto/brand.dto';
import { BrandEntity } from '../repositories/brand.entity';

@ApiTags('Brand')
@Controller('brand')
@Public()

export class BrandController {
	constructor(private readonly brandService: BrandService) { }

	@Post()
	create(@Body() reqDto: NewBrandDto) {
		return this.brandService.createBrand(reqDto);
	}

	@Get()
	findAll(): Promise<BrandEntity[]> {
		return this.brandService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<BrandEntity> {
		return this.brandService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateBrandDto: NewBrandDto): Promise<BrandEntity> {
		return this.brandService.update(id, updateBrandDto);
	}

	@Delete(':id')
	softDelete(@Param('id') id: string): Promise<void> {
		return this.brandService.softDelete(id);
	}
}

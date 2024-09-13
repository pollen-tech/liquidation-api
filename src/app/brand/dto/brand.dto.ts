import { IsOptional, IsEnum, IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Status } from '../../../common/enums/common.enum';
import { BrandEntity } from '../repositories/brand.entity';
import { Type } from 'class-transformer';

export class NewBrandDto {
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	image?: string;

	@IsEnum(Status)
	status: Status;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CategoryDto)
	brand_category: CategoryDto[];
}

class CategoryDto {
	@IsString()
	category_id: string;

	@IsString()
	category_name: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => SubCategoryDto)
	sub_category: SubCategoryDto[];
}

class SubCategoryDto {
	@IsString()
	sub_category_id: string;

	@IsString()
	sub_category_name: string;
}

export class BrandMapper {
	static async toBrandEntity(req: NewBrandDto): Promise<BrandEntity> {
		const brandEntity = new BrandEntity();
		brandEntity.name = req.name;
		brandEntity.image = req.image;
		brandEntity.status = req.status;
		return brandEntity;
	}
}
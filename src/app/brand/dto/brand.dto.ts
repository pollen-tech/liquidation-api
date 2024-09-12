import { IsOptional, IsEnum, IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Status } from '../../../common/enums/common.enum';
import { BrandEntity } from '../repositories/brand.entity';
import { BrandCategoryEntity } from '../repositories/brand.category.entity';
import { Type } from 'class-transformer';

//export class NewBrandDto {
//	brand_name: string;
//	brand_image?: string;
//	status: Status;
//	brand_category: {
//		category_id: number;
//		category_name: string;
//		sub_category: {
//			sub_category_id: number;
//			sub_category_name: string;
//		}[];
//	}[];
//}
export class NewBrandDto {
	@IsString()
	brand_name: string;

	@IsOptional()
	@IsString()
	brand_image?: string;

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
		brandEntity.brand_name = req.brand_name;
		brandEntity.brand_image = req.brand_image;
		brandEntity.status = req.status;
		brandEntity.updated_on = String(Math.floor(Date.now() / 1000));

		// Map each category and subcategory from the request DTO to BrandCategoryEntity
		const brandCategories: BrandCategoryEntity[] = req.brand_category.flatMap((category) =>
			category.sub_category.map((subCategory) => {
				const categoryEntity = new BrandCategoryEntity();
				categoryEntity.category_id = category.category_id;
				categoryEntity.category_name = category.category_name;
				categoryEntity.sub_category_id = subCategory.sub_category_id;
				categoryEntity.sub_category_name = subCategory.sub_category_name;
				categoryEntity.status = Status.NA;
				categoryEntity.brand_id = '';
				console.log('categoryEntity: ', categoryEntity);

				return categoryEntity;
			})
		);
		console.log('brandEntity: ', brandEntity);
		brandEntity.brandCategories = Promise.resolve(brandCategories);

		return brandEntity;
	}
}



//export class NewBrandDto {
//	@IsString()
//	brand_name: string;

//	@IsString()
//	brand_image?: string;

//	@IsArray()
//	@ValidateNested({ each: true })
//	@Type(() => CategoryDto)
//	brand_category: CategoryDto[];

//	@IsNotEmpty()
//	status: Status;
//}

//class CategoryDto {
//	@IsString()
//	category_id: string;

//	@IsString()
//	category_name: string;

//	@IsArray()
//	@ValidateNested({ each: true })
//	@Type(() => SubCategoryDto)
//	sub_category: SubCategoryDto[];
//}

//class SubCategoryDto {
//	@IsString()
//	sub_category_id: string;

//	@IsString()
//	sub_category_name: string;
//}

//export class BrandMapper {
//	static toBrandEntity(req: NewBrandDto): BrandEntity {
//		const entity = new BrandEntity();
//		entity.brand_name = req.brand_name;
//		entity.brand_image = req.brand_image;

//		// Map categories and subcategories
//		entity.categories = req.brand_category.map(categoryDto => {
//			const category = new BrandCategoryEntity();
//			category.category_id = categoryDto.category_id;
//			category.category_name = categoryDto.category_name;

//			// Map subcategories
//			category.brandSubCategories = categoryDto.sub_category.map(subCategoryDto => {
//				const subCategory = new BrandSubCategoryEntity();
//				subCategory.sub_category_id = subCategoryDto.sub_category_id;
//				subCategory.sub_category_name = subCategoryDto.sub_category_name;
//				return subCategory;
//			});

//			return category;
//		});

//		return entity;
//	}
//}

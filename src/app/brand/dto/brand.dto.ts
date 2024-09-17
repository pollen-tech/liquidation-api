import {IsOptional, IsEnum, IsNotEmpty, IsString, IsArray, ValidateNested} from 'class-validator';
import {Optional} from '@nestjs/common';
import {Status} from '../../../common/enums/common.enum';
import {BrandEntity} from '../repositories/brand.entity';
import {Type} from 'class-transformer';
import {BrandCategoryEntity} from '../repositories/brand.category.entity';

export class NewBrandDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CategoryDto)
    brand_categories: CategoryDto[];
}

export class BrandIdAndNameOnlyDto {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

}

export class CategoryDto {
    @IsString()
    category_id: string;

    @IsString()
    category_name: string;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => SubCategoryDto)
    sub_categories: SubCategoryDto[];
}

class SubCategoryDto {
    @IsString()
    sub_category_id: string;

    @IsString()
    sub_category_name: string;
}

export class BrandApiRes {
    status_code: string;
    message?: string;
    data?: BrandDtoRes | BrandDtoRes[];
}

export class BrandDtoRes {
    id: string;
    name: string;
    image?: string;
    status: Status;
    brand_categories: CategoryDto[];
}

export class BrandMapper {
    static async toBrandEntity(req: NewBrandDto): Promise<BrandEntity> {
        const brandEntity = new BrandEntity();
        brandEntity.name = req.name;
        brandEntity.image = req.image;
        return brandEntity;
    }

    static toBrandResDto(saved_brand: BrandEntity, brand_categories: BrandCategoryEntity[]) {
        const dto_res = new BrandDtoRes();
        dto_res.name = saved_brand.name;
        dto_res.image = saved_brand.image;
        dto_res.status = saved_brand.status;
        dto_res.id = saved_brand.id;

        const groupedCategories = brand_categories.reduce((acc, category) => {
            if (!acc[category.category_id]) {
                acc[category.category_id] = {
                    category_id: category.category_id.toString(),
                    category_name: category.category_name,
                    sub_category: [],
                };
            }
            acc[category.category_id].sub_category.push({
                sub_category_id: category.sub_category_id.toString(),
                sub_category_name: category.sub_category_name,
            });
            return acc;
        }, {});
        dto_res.brand_categories = Object.values(groupedCategories);
        return dto_res;
    }

    static toOnlyBrandResDtosWithoutCategory(saved_brands: BrandEntity[]) {
        const dtos = saved_brands.map((saved_brand) => {
            const dto_res = new BrandDtoRes();
            dto_res.name = saved_brand.name;
            dto_res.image = saved_brand.image;
            dto_res.status = saved_brand.status;
            dto_res.id = saved_brand.id;
            return dto_res;
        });
        return dtos;
    }
}

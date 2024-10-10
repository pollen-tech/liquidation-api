import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Status } from '../../../common/enums/common.enum';
import { BrandEntity } from '../repositories/brand.entity';
import { Type } from 'class-transformer';
import { BrandCategoryEntity } from '../repositories/brand.category.entity';
import { ApiResDto } from '../../../common/dtos/id.dto';

export class NewBrandDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsArray()
    @ValidateNested({ each: true })
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

export class UpdateBrandDto extends NewBrandDto {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CategoryDto)
    brand_categories: CategoryDto[];
}

export class UpdateMultipleBrandDto {
    @Type(() => UpdateBrandDto)
    @IsArray()
    brands: UpdateBrandDto[];
}

export class CategoryDto {
    @IsString()
    category_id: number;

    @IsString()
    category_name: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SubCategoryDto)
    sub_categories: SubCategoryDto[];
}

class SubCategoryDto {
    @IsString()
    sub_category_id: number;

    @IsString()
    sub_category_name: string;
}

export class BrandApiResDto extends ApiResDto {
    data?: BrandDtoRes | BrandDtoRes[];
}

export class BrandDtoRes {
    id: string;
    name: string;
    image?: string;
    status: Status;
    seq_no: number;
    brand_categories: CategoryDto[];
}

export class BrandCompactDto {
    brand_id: string;
    brand_name: string;

    constructor(id: string, name: string) {
        this.brand_id = id;
        this.brand_name = name;
    }
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
        dto_res.seq_no = saved_brand.seq_no;
        dto_res.id = saved_brand.id;

        const groupedCategories = brand_categories.reduce((acc, category) => {
            if (!acc[category.category_id]) {
                acc[category.category_id] = {
                    category_id: category.category_id.toString(),
                    category_name: category.category_name,
                    sub_categories: [],
                };
            }
            acc[category.category_id].sub_categories.push({
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
            dto_res.seq_no = saved_brand.seq_no;
            return dto_res;
        });
        return dtos;
    }
}

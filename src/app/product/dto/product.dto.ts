import {IsOptional, IsEnum, IsString, IsArray, ValidateNested} from 'class-validator';
import {Status} from '../../../common/enums/common.enum';
import {ProductEntity} from '../repositories/product.entity';
import {Type} from 'class-transformer';
import {ProductCategoryEntity} from '../repositories/product.category.entity';
import {ApiResDto} from "../../../common/dtos/id.dto";

export class ProductApiResDto extends ApiResDto {
    data?: any | NewProductDto | NewProductDto[];
}

export class NewProductDto {

    @IsString()
    name: string;

    @IsString()
    sku: string;

    @IsString()
    brand_id: string;

    @IsString()
    brand_name?: string;

    @IsString()
    lms_company_id: string;

    @IsString()
    user_id: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CategoryDto)
    product_categories: CategoryDto[];
}

export class UpdateProductDto extends NewProductDto {
    @IsString()
    id: string;
}

export class UpdateMultiProductDto {
    products: UpdateProductDto[]
}

class CategoryDto {
    @IsString()
    category_id: string;

    @IsString()
    category_name: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => SubCategoryDto)
    sub_categories?: SubCategoryDto[] = [];
}

class SubCategoryDto {
    @IsString()
    sub_category_id: string;

    @IsString()
    sub_category_name: string;

    @IsString()
    @IsOptional()
    sub_category_description: string;
}

export class ProductResDto {
    id: string;
    name: string;
    pollen_sku: string;
    sku: string;
    brand_id: string;
    brand_name?: string;
    image?: string;
    status: Status;
    product_categories?: CategoryDto[];
}

export class ProductMapper {
    static async toProductEntity(req: NewProductDto): Promise<ProductEntity> {
        const productEntity = new ProductEntity();
        productEntity.name = req.name;
        productEntity.brand_id = req.brand_id;
        productEntity.lms_company_id = req.lms_company_id;
        productEntity.pollen_sku = 'TMP00001';
        productEntity.sku = req.sku;
        return productEntity;
    }

    static toProductResDto(saved_product: ProductEntity, product_categories?: ProductCategoryEntity[]): ProductResDto {
        const dto_res = new ProductResDto();
        dto_res.name = saved_product.name;
        dto_res.id = saved_product.id;
        dto_res.pollen_sku = saved_product.pollen_sku;
        dto_res.sku = saved_product.sku;
        dto_res.status = saved_product.status;

        const groupedCategories = this.groupByCategoryDto(product_categories)
        dto_res.product_categories = Object.values(groupedCategories);
        return dto_res;
    }

    static groupByCategoryDto(categories: ProductCategoryEntity[]): CategoryDto[] {
        const groupedCategories = categories.reduce((acc, category) => {
            if (!acc[category.category_id]) {
                acc[category.category_id] = {
                    category_id: category.category_id.toString(),
                    category_name: category.category_name,
                    sub_categories: [],
                };
            }
            acc[category.category_id].sub_categories.push({
                category_id: category.category_id.toString(),
                sub_category_id: category.sub_category_id || null,
                sub_category_name: category.sub_category_name,
                sub_category_description: category.sub_category_description,
            });
            return acc;
        }, {});
        return Object.values(groupedCategories);
    }
}

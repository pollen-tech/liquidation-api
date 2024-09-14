import { IsOptional, IsEnum, IsString, IsArray, ValidateNested } from 'class-validator';
import { Status } from '../../../common/enums/common.enum';
import { ProductEntity } from '../repositories/product.entity';
import { Type } from 'class-transformer';

export class ProductResDto {
    status_code: string;
    message!: string;
    data: any | NewProductDto | NewProductDto[];
}

export class NewProductDto {
    @IsString()
    name: string;

    @IsString()
    pollen_sku: string;

    @IsString()
    sku: string;

    @IsString()
    brand_id: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsEnum(Status)
    status: Status;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CategoryDto)
    product_category: CategoryDto[];
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

    @IsString()
    @IsOptional()
    sub_category_description: string;
}

export class ProductMapper {
    static async toProductEntity(req: NewProductDto): Promise<ProductEntity> {
        const productEntity = new ProductEntity();
        productEntity.name = req.name;
        productEntity.image = req.image;
        productEntity.status = req.status;
        productEntity.brand_id = req.brand_id;
        productEntity.pollen_sku = req.pollen_sku;
        productEntity.sku = req.sku;

        return productEntity;
    }
}

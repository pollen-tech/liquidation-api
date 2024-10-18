import {ProductVariantOptionEntity} from "../entity/product.variant.option.entity";
import {ApiResDto} from "../../../common/dtos/id.dto";

export class ProductVariantApiResDto extends ApiResDto {
    data?: any | NewProductVariantOptionDto  ;
}

class NewProductVariantDto {
    product_id: string;
    product_name: string;
    pollen_sku: string;
    user_name: string;
    user_id: string;
    variants: NewVariantDto[];
}

class NewVariantDto {
    image: string;
    variant_sku: string;
    sku: string;
    type: string;
    color: string;
    size: string;
    status: string;
}

class ProductVariantDto extends NewProductVariantDto {
    id: string;
}

class VariantDto extends NewVariantDto {
    id: string;
}

export class NewProductVariantOptionDto {
    product_id: string;
    option: {
        types: string[],
        colors: string[],
        sizes: string[]
    };
}

export class ProductVariantOptionMapper {

    static toEntity(dto: NewProductVariantOptionDto) {
        const entity = new ProductVariantOptionEntity();
        entity.id = dto.product_id;
        entity.product_id = dto.product_id;
        entity.option = JSON.stringify(dto.option);
        return entity;
    }

    static toDto(entity: ProductVariantOptionEntity) {
        const dto = new NewProductVariantOptionDto();
        dto.product_id = entity.product_id;
        dto.option = JSON.parse(entity.option);
        return dto;
    }
}


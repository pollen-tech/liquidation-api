import {ProductVariantOptionEntity} from "../entity/product.variant.option.entity";
import {ApiResDto} from "../../../common/dtos/id.dto";
import {ProductVariantEntity} from "../entity/product.variant.entity";
import {Status} from "../../../common/enums/common.enum";

export class ProductVariantApiResDto extends ApiResDto {
    data?: ProductVariantDto[] | NewProductVariantOptionDto | DeleteProductVariantStatusDto[];
}

export class NewMultiProductVariantDto {
    variants: NewProductVariantDto[];
}

export class DeleteMultiProductVariantDto {
    user_name: string;
    user_id: string;
    product_variant_ids: string[];
}

export class DeleteProductVariantStatusDto {
    id: string;
    product_id: string;
    status: Status
}

export class NewProductVariantDto {
    id?: string;
    product_id: string;
    image: string;
    variant_sku: string;
    sku: string;
    type: string;
    color: string;
    size: string;
    user_id: string;
    user_name: string;
    status: Status;
}

export class ProductVariantDto extends NewProductVariantDto {
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

export class ProductVariantMapper {

    static toEntity(dto: NewProductVariantDto) {
        const entity = new ProductVariantEntity();
        if (dto.id) {
            entity.id = dto.id;
        }
        entity.product_id = dto.product_id;
        entity.variant_sku = dto.variant_sku;
        entity.sku = dto.sku;
        entity.image = dto.image;
        entity.type = dto.type;
        entity.color = dto.color;
        entity.size = dto.size;
        entity.user_id = dto.user_id;
        entity.user_name = dto.user_name;
        entity.status = dto.status;
        return entity;
    }

    static toUpdateEntity(existing_entity: ProductVariantEntity, dto: NewProductVariantDto) {
        const entity = new ProductVariantEntity();
        if (existing_entity.product_id == dto.product_id) {
            existing_entity.variant_sku = dto.variant_sku;
            existing_entity.sku = dto.sku;
            existing_entity.image = dto.image;
            existing_entity.type = dto.type;
            existing_entity.color = dto.color;
            existing_entity.size = dto.size;
            existing_entity.user_id = dto.user_id;
            existing_entity.user_name = dto.user_name;
            existing_entity.status = dto.status;
            return entity;
        }
        return null;
    }

    static toDto(entity: ProductVariantEntity) {
        const dto = new NewProductVariantDto();
        dto.id = entity.id;
        dto.product_id = entity.product_id;
        dto.variant_sku = entity.variant_sku;
        dto.sku = entity.sku;
        dto.image = entity.image;
        dto.type = entity.type;
        dto.color = entity.color;
        dto.size = entity.size;
        dto.user_id = entity.user_id;
        dto.user_name = entity.user_name;
        dto.status = entity.status;
        return dto;
    }

    static toDeletedStatusDto(entity: ProductVariantEntity) {
        const dto = new DeleteProductVariantStatusDto();
        dto.id = entity.id;
        dto.product_id = entity.product_id;
        dto.status = entity.status;
        return dto;
    }

}

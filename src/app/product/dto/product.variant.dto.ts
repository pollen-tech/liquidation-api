import {ProductVariantOptionEntity} from '../entity/product.variant.option.entity';
import {ApiResDto} from '../../../common/dtos/id.dto';
import {ProductVariantEntity} from '../entity/product.variant.entity';
import {Status} from '../../../common/enums/common.enum';
import {IsArray, IsObject, IsOptional, IsString, IsUUID, ValidateNested} from "class-validator";
import {ApiBody} from "@nestjs/swagger";
import {Type} from "class-transformer";

export class ProductVariantApiResDto extends ApiResDto {
    data?: ProductVariantDto[] | ProductVariantDto | NewProductVariantOptionDto | DeleteProductVariantStatusDto[];
}

export class NewMultiProductVariantDto {
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => NewProductVariantDto)
    variants: NewProductVariantDto[];
}

export class DeleteMultiProductVariantDto {

    @IsString()
    user_name: string;

    @IsUUID()
    user_id: string;

    @IsArray()
    product_variant_ids: string[];
}

export class DeleteProductVariantStatusDto {
    id: string;
    product_id: string;
    variant_sku: string;
    status: Status;
}

export class NewProductVariantDto {

    @IsUUID()
    @IsOptional()
    id?: string;

    @IsUUID()
    product_id: string;

    @IsString()
    image: string;

    @IsString()
    @IsOptional()
    variant_sku?: string;

    @IsString()
    @IsOptional()
    sku?: string;

    @IsString()
    type: string;

    @IsString()
    color: string;

    @IsString()
    size: string;

    @IsUUID()
    user_id: string;

    @IsString()
    user_name: string;

    @IsString()
    @IsOptional()
    status?: Status;
}

export class ProductVariantDto extends NewProductVariantDto {
}

export class NewProductVariantOptionDto {
    @IsOptional()
    @IsUUID()
    product_id?: string;

    @IsObject()
    options: {
        types: string[];
        colors: string[];
        sizes: string[];
    };
}

export class ProductVariantOptionMapper {
    static toEntity(dto: NewProductVariantOptionDto) {
        const entity = new ProductVariantOptionEntity();
        entity.id = dto.product_id;
        entity.product_id = dto.product_id;
        entity.options = JSON.stringify(dto.options);
        return entity;
    }

    static toDto(entity: ProductVariantOptionEntity) {
        const dto = new NewProductVariantOptionDto();
        dto.product_id = entity.product_id;
        dto.options = JSON.parse(entity.options);
        return dto;
    }
}

export class ProductVariantMapper {
    static toEntity(dto: NewProductVariantDto) {
        const entity = new ProductVariantEntity();
        if (dto.id) {
            // if id available means, its for update and assign existing variant sku
            entity.id = dto.id;
            entity.variant_sku = dto.variant_sku;
        }
        entity.product_id = dto.product_id;
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
        dto.variant_sku = entity.variant_sku;
        dto.status = entity.status;
        return dto;
    }
}

import { ProductImageEntity } from '../repositories/product.image.entity';

export class ProductImageDto {
    id?: string;
    product_id: string;
    image: string;
    updated_at?: Date;
}

export class ProductImageResDto {
    product_id?: string;
    product_name?: string;
    images?: ProductImageDto[];
}

export class ProductImageMapper {
    static toEntity(dto: ProductImageDto) {
        const entity = new ProductImageEntity();
        entity.product_id = dto.product_id;
        entity.image = dto.image;
        return entity;
    }

    static toDtos(entities: ProductImageEntity[]) {
        const dtos = entities.map((entity) => {
            const dto: ProductImageDto = {
                product_id: entity.product_id,
                image: entity.image,
                id: entity.id,
                updated_at: entity.updated_at,
            };
            return dto;
        });
        return dtos;
    }
}

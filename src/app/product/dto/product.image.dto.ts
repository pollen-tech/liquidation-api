import {ProductImageEntity} from "../repositories/product.image.entity";

export class ProductImageDto {
    id?: string;
    product_id: string;
    image: string;
}

export class ProductImageMapper {

    static toEntity(dto: ProductImageDto) {
        const entity = new ProductImageEntity();
        entity.product_id = dto.product_id;
        entity.image = dto.image;
        return entity;
    }

}

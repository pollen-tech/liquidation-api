import { Injectable } from '@nestjs/common';
import { NewProductVariantOptionDto, ProductVariantOptionMapper } from '../dto/product.variant.dto';
import { ProductVariantOptionRepository } from '../repositories/product.variant.option.repository';
import { Status } from '../../../common/enums/common.enum';

@Injectable()
export class ProductVariantOptionService {
    constructor(private readonly variantOptionRepository: ProductVariantOptionRepository) {}

    public async createOrUpdate(newDto: NewProductVariantOptionDto) {
        const existing_entity = await this.variantOptionRepository.findByProductId(newDto.product_id);
        if (existing_entity) {
            existing_entity.options = JSON.stringify(newDto.options);
            existing_entity.status = Status.ACTIVE;
            return await this.variantOptionRepository.save(existing_entity).then((entity) => ProductVariantOptionMapper.toDto(entity));
        } else {
            const newE_entity = ProductVariantOptionMapper.toEntity(newDto);
            return await this.variantOptionRepository.save(newE_entity).then((entity) => ProductVariantOptionMapper.toDto(entity));
        }
    }

    public async findByProductId(productId: string) {
        const found_entity = await this.variantOptionRepository.findByProductId(productId);
        if (found_entity) {
            return ProductVariantOptionMapper.toDto(found_entity);
        } else {
            return null;
        }
    }
}

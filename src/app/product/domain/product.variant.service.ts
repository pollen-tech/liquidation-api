import { Injectable } from '@nestjs/common';
import { ProductVariantRepository } from '../repositories/product.variant.repository';
import {
    DeleteMultiProductVariantDto,
    DeleteProductVariantStatusDto,
    NewMultiProductVariantDto,
    NewProductVariantDto,
    ProductVariantDto,
    ProductVariantMapper,
} from '../dto/product.variant.dto';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class ProductVariantService {
    constructor(private readonly productVariantRepository: ProductVariantRepository) {}

    @Transactional()
    public async multiCreateOrUpdate(newMultiDto: NewMultiProductVariantDto): Promise<ProductVariantDto[]> {
        const promises = newMultiDto.variants.map((dto) => this.createOrUpdate(dto));
        return await Promise.all(promises);
    }

    public async createOrUpdate(newDto: NewProductVariantDto): Promise<ProductVariantDto> {
        if (!newDto.id) {
            return this.create(newDto);
        } else {
            return this.update(newDto);
        }
    }

    public async findAllByProductId(productId: string): Promise<ProductVariantDto[]> {
        const entities = await this.productVariantRepository.findAllByProductIdExcludeDeleted(productId);
        return entities.map((entity) => ProductVariantMapper.toDto(entity));
    }

    public async multiDelete(deleteVariantDto: DeleteMultiProductVariantDto): Promise<DeleteProductVariantStatusDto[]> {
        const deleted_entities = await this.productVariantRepository.deleteAllByIds(
            deleteVariantDto.product_variant_ids,
            deleteVariantDto.user_id,
            deleteVariantDto.user_name,
        );
        return deleted_entities.map((entity) => ProductVariantMapper.toDeletedStatusDto(entity));
    }

    public async create(newDto: NewProductVariantDto): Promise<ProductVariantDto> {
        const new_entity = ProductVariantMapper.toEntity(newDto);
        return await this.productVariantRepository.save(new_entity).then((entity) => ProductVariantMapper.toDto(entity));
    }

    private async update(newDto: NewProductVariantDto) {
        const existing_entity = await this.productVariantRepository.findOneBy({ id: newDto.id });
        const updated_entity = ProductVariantMapper.toUpdateEntity(existing_entity, newDto);
        return await this.productVariantRepository.save(updated_entity).then((entity) => {
            newDto.id = entity.id;
            return newDto;
        });
    }
}

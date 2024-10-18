import BaseRepository from '../../../database/infrastructure/repository/base.repository';
import {CustomRepository} from '../../../database/decorators/custom-repository.decorator';
import {ProductVariantOptionEntity} from "../entity/product.variant.option.entity";


@CustomRepository(ProductVariantOptionEntity)
export class ProductVariantOptionRepository extends BaseRepository<ProductVariantOptionEntity> {
}

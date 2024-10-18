import BaseRepository from '../../../database/infrastructure/repository/base.repository';
import {CustomRepository} from '../../../database/decorators/custom-repository.decorator';
import {ProductVariantEntity} from "../entity/product.variant.entity";

@CustomRepository(ProductVariantEntity)
export class ProductVariantRepository extends BaseRepository<ProductVariantEntity> {

}

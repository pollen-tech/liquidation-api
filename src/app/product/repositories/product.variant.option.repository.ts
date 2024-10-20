import BaseRepository from '../../../database/infrastructure/repository/base.repository';
import { CustomRepository } from '../../../database/decorators/custom-repository.decorator';
import { ProductVariantOptionEntity } from '../entity/product.variant.option.entity';
import { Status } from '../../../common/enums/common.enum';

@CustomRepository(ProductVariantOptionEntity)
export class ProductVariantOptionRepository extends BaseRepository<ProductVariantOptionEntity> {
    public async findByProductId(productId: string): Promise<ProductVariantOptionEntity> {
        console.log(productId)
        return await this.getRepository().findOneBy({ product_id: productId });
    }
}

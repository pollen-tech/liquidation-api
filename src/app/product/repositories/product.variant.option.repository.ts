import BaseRepository from '../../../database/infrastructure/repository/base.repository';
import { CustomRepository } from '../../../database/decorators/custom-repository.decorator';
import { ProductVariantOptionEntity } from '../entity/product.variant.option.entity';
import { Status } from '../../../common/enums/common.enum';

@CustomRepository(ProductVariantOptionEntity)
export class ProductVariantOptionRepository extends BaseRepository<ProductVariantOptionEntity> {
    public async findByProductId(productId: string): Promise<ProductVariantOptionEntity> {
        return await this.getRepository().findOneBy({ product_id: productId });
    }

    // public async updateOption(productId: string, option: string): Promise<ProductVariantOptionEntity> {
    //     const currentDate: Date = new Date();
    //     return await this.getRepository().update(
    //         { product_id: productId },
    //         {
    //             status: Status.ACTIVE,
    //             option: option,
    //             updated_at: currentDate,
    //             updated_on: Date.now(),
    //         },
    //     );
    // }
}

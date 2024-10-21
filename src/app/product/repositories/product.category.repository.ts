import BaseRepository from '../../../database/infrastructure/repository/base.repository';
import { CustomRepository } from '../../../database/decorators/custom-repository.decorator';
import { In } from 'typeorm';
import { Status } from '../../../common/enums/common.enum';
import { ProductCategoryEntity } from '../entity/product.category.entity';

@CustomRepository(ProductCategoryEntity)
export class ProductCategoryRepository extends BaseRepository<ProductCategoryEntity> {
    async findAllByProductIds(productIds: string[]): Promise<ProductCategoryEntity[]> {
        return await this.getRepository().findBy({
            product_id: In(productIds),
            status: Status.ACTIVE,
        });
    }
}

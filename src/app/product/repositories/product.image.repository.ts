import BaseRepository from '../../../database/infrastructure/repository/base.repository';
import {CustomRepository} from '../../../database/decorators/custom-repository.decorator';
import {ProductImageEntity} from "./product.image.entity";
import {Status} from "../../../common/enums/common.enum";

@CustomRepository(ProductImageEntity)
export class ProductImageRepository extends BaseRepository<ProductImageEntity> {

    async softDeleteByProductId(productId: string) {
        const currentDate: Date = new Date();
        return this.getRepository()
            .update({product_id: productId},
                {
                    status: Status.DELETED,
                    // updated_at: currentDate,
                    updated_at:  Date.now(),
                    updated_on: Date.now()
                });
    }
}

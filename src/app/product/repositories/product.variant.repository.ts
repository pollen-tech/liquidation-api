import BaseRepository from '../../../database/infrastructure/repository/base.repository';
import { CustomRepository } from '../../../database/decorators/custom-repository.decorator';
import { ProductVariantEntity } from '../entity/product.variant.entity';
import { Status } from '../../../common/enums/common.enum';
import { In, Not } from 'typeorm';

@CustomRepository(ProductVariantEntity)
export class ProductVariantRepository extends BaseRepository<ProductVariantEntity> {
    async findAllByProductId(productId: string): Promise<ProductVariantEntity[]> {
        return await this.getRepository().findBy({ product_id: productId, status: Not(Status.DELETED) });
    }

    async getNextSeqNo(): Promise<number> {
        const qb = this.getRepository().createQueryBuilder();
        const data = await qb.select('coalesce(max(seq_no)+1,10000)', 'next_seq_no').getRawOne();
        return parseInt(data.next_seq_no);
    }

    async deleteAllByIds(ids: string[], user_id: string, user_name: string) {
        const currentDate: Date = new Date();
        await this.getRepository().update(
            { id: In(ids) },
            {
                user_id: user_id,
                user_name: user_name,
                status: Status.DELETED,
                updated_at: currentDate,
                updated_on: Date.now(),
            },
        );
        return this.getRepository().findBy({ id: In(ids) });
    }
}

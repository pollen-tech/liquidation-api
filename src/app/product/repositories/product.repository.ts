import { ProductEntity } from './product.entity';
import { CustomRepository } from '../../../database/decorators/custom-repository.decorator';
import BaseRepository from '../../../database/infrastructure/repository/base.repository';

@CustomRepository(ProductEntity)
export class ProductRepository extends BaseRepository<ProductEntity> {
    async getNextSeqNo() {
        const qb = this.createQueryBuilder(this.metadata.givenTableName);
        const data = await qb.select('coalesce(max(seq_no)+1,1000)', 'next_account_id').getRawOne();
        return parseInt(data.next_account_id);
    }

}

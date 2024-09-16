import { ProductEntity } from './product.entity';
import { CustomRepository } from '../../../database/decorators/custom-repository.decorator';
import BaseRepository from '../../../database/infrastructure/repository/base.repository';

@CustomRepository(ProductEntity)
export class ProductRepository extends BaseRepository<ProductEntity> {
    async getNextSeqNo(): Promise<number> {
        const qb = this.createQueryBuilder(this.metadata.givenTableName);
        const data = await qb.select('coalesce(max(seq_no)+1,1000)', 'next_seq_no').getRawOne();
        return parseInt(data.next_seq_no);
    }
}

import {ProductEntity} from './product.entity';
import {CustomRepository} from '../../../database/decorators/custom-repository.decorator';
import BaseRepository from '../../../database/infrastructure/repository/base.repository';
import {Status} from 'src/common/enums/common.enum';
import {getRepository, ILike, Not} from "typeorm";
import {PaginationParam} from "../../../common/pagination.entity";

@CustomRepository(ProductEntity)
export class ProductRepository extends BaseRepository<ProductEntity> {

    async getNextSeqNo(): Promise<number> {
        const qb = this.createQueryBuilder(this.metadata.givenTableName);
        const data = await qb.select('coalesce(max(seq_no)+1,1000)', 'next_seq_no').getRawOne();
        return parseInt(data.next_seq_no);
    }

    async findAllByActiveStatus() {
        return await this.getRepository().findBy({status: Status.ACTIVE});
    }

    async getPaginatedProductsByActiveStatus(paginationParam: PaginationParam) {
        return await this.getPaginated(paginationParam, {where: {status: Status.ACTIVE}});
    }

    async findOneByName(name: string) {
        return await this.getRepository().findOneBy({name});
    }

    async findAllProductByName(name: string) {
        return await this.getRepository().findBy(
            {
                name: ILike(`%${name}%`),
                status: Status.ACTIVE
            }
        );
    }

}

import { CustomRepository } from '../../../database/decorators/custom-repository.decorator';
import BaseRepository from '../../../database/infrastructure/repository/base.repository';
import { CompactProductEntity } from './compact.product.entity';
import { Status } from '../../../common/enums/common.enum';
import { ProductPaginationParam } from '../dto/product.dto';
import { ILike } from 'typeorm';

@CustomRepository(CompactProductEntity)
export class CompactProductRepository extends BaseRepository<CompactProductEntity> {
    async getPaginatedProductsByActiveStatus(paginationParam: ProductPaginationParam) {
        return await this.getPaginated(paginationParam, {
            where: {
                lms_company_id: paginationParam.company_id,
                status: Status.ACTIVE,
                name: ILike(`%${paginationParam.search}%`)
            },
        });
    }
}

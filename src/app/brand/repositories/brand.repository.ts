import { BrandEntity } from './brand.entity';
import { CustomRepository } from '../../../database/decorators/custom-repository.decorator';
import BaseRepository from '../../../database/infrastructure/repository/base.repository';
import { Not, ILike } from 'typeorm';
import { Status } from '../../../common/enums/common.enum';
import { PaginationParam } from 'src/common/pagination.entity';
import { BrandPaginationParam } from '../dto/brand.dto';


@CustomRepository(BrandEntity)
export class BrandRepository extends BaseRepository<BrandEntity> {
    async findAllByActiveStatus() {
        return await this.getRepository().findBy({ status: Status.ACTIVE });
    }

    async findAllByActiveStatusOrderByName(paginationParam: BrandPaginationParam) {
        return await this.getRepository().find({
            where: { 
                lms_company_id: paginationParam.company_id,
                status: Status.ACTIVE
            }, 
            order: { name: 'ASC' },
        });
    }

    async getPaginatedBrandsByActiveStatus(paginationParam: BrandPaginationParam) {
        return await this.getPaginated(paginationParam, { 
            where: { 
                lms_company_id: paginationParam.company_id,
                status: Status.ACTIVE,
                name: ILike(`%${paginationParam.search}%`)
            } 
        });
    }
}

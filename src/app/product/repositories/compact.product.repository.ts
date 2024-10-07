import {CustomRepository} from '../../../database/decorators/custom-repository.decorator';
import BaseRepository from '../../../database/infrastructure/repository/base.repository';
import {CompactProductEntity} from "./compact.product.entity";
import {PaginationParam} from "../../../common/pagination.entity";
import {Status} from "../../../common/enums/common.enum";
import {ProductPaginationParam} from "../dto/product.dto";

@CustomRepository(CompactProductEntity)
export class CompactProductRepository extends BaseRepository<CompactProductEntity> {

    async getPaginatedProductsByActiveStatus(paginationParam: ProductPaginationParam) {
        return await this.getPaginated(paginationParam, {
            where: {
                lms_company_id: paginationParam.companyId,
                status: Status.ACTIVE
            }
        });
    }
}


import { BrandEntity } from './brand.entity';
import {CustomRepository} from "../../../database/decorators/custom-repository.decorator";
import BaseRepository from "../../../database/infrastructure/repository/base.repository";

@CustomRepository(BrandEntity)
export class BrandRepository extends BaseRepository<BrandEntity> {
}
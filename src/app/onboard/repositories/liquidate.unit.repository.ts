import { CustomRepository } from 'src/database/decorators/custom-repository.decorator';
import BaseRepository from 'src/database/infrastructure/repository/base.repository';
import { LiquidateUnitEntity } from './liquidate.unit.entity';

@CustomRepository(LiquidateUnitEntity)
export class LiquidateUnitRepository extends BaseRepository<LiquidateUnitEntity> {}

import { CustomRepository } from 'src/database/decorators/custom-repository.decorator';
import BaseRepository from 'src/database/infrastructure/repository/base.repository';
import { CompanyUserEntity } from './company.user.entity';

@CustomRepository(CompanyUserEntity)
export class CompanyUserRepository extends BaseRepository<CompanyUserEntity> {}

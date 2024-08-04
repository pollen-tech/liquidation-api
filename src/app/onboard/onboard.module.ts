import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { OnboardController } from './controller/onboard.controller';
import { OnboardCompanyService } from './domain/onboard.company.service';
import { CompanyTypeEntity } from './repositories/company.type.entity';
import { CompanyEntity } from './repositories/company.entity';
import { CompanyUserEntity } from './repositories/company.user.entity';
import { LiquidateUnitEntity } from './repositories/liquidate.unit.entity';
import { CompanyTypeRepository } from './repositories/company.type.repository';
import { CompanyRepository } from './repositories/company.repository';
import { CompanyUserRepository } from './repositories/company.user.repository';
import { LiquidateUnitRepository } from './repositories/liquidate.unit.repository';
import { NotifyModule } from '../notify/notify.module';

let repositories: any[] = [CompanyTypeRepository, CompanyRepository, CompanyUserRepository, LiquidateUnitRepository];

@Module({
    imports: [
        TypeOrmModule.forFeature([CompanyTypeEntity, CompanyEntity, CompanyUserEntity, LiquidateUnitEntity]),
        DatabaseModule.forCustomRepository(repositories),
        NotifyModule,
    ],
    providers: [OnboardCompanyService],
    controllers: [OnboardController],
    exports: [TypeOrmModule, OnboardCompanyService],
})
export class OnboardModule {}

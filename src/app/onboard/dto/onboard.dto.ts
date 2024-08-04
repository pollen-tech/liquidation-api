import { IsNotEmpty } from 'class-validator';
import { CompanyEntity } from '../repositories/company.entity';
import { Optional } from '@nestjs/common';
import { Status } from '../../../common/enums/common.enum';

export class OnboardCompanyReqDto {
    id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    company_type_id: number;

    @IsNotEmpty()
    operation_country_id: number;

    @IsNotEmpty()
    operation_country_name: string;

    @IsNotEmpty()
    liquidate_unit_id: number;

    @IsNotEmpty()
    liquidate_unit_name: string;

    @Optional()
    logo: string;

    @IsNotEmpty()
    user_id: string;
}

export class OnboardCompanyResDto extends OnboardCompanyReqDto {
    id: string;
    account_id: number;
    company_type_description: string;
    status_code: string;
}

export class OnboardCompanyMapper {
    static toCompanyEntity(req: OnboardCompanyReqDto) {
        const entity = new CompanyEntity();
        entity.id = req.id;
        entity.name = req.name;
        entity.company_type_id = req.company_type_id;
        entity.country_id = req.operation_country_id;
        entity.country_name = req.operation_country_name;
        entity.liquidate_unit_id = req.liquidate_unit_id;
        entity.liquidate_unit_name = req.liquidate_unit_name;
        entity.status = Status.ACTIVE;
        return entity;
    }
}

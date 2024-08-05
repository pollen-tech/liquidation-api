import { Body, Controller, Get, HostParam, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { OnboardCompanyService } from '../domain/onboard.company.service';
import { OnboardCompanyReqDto } from '../dto/onboard.dto';
import { EmailUserDto } from '../../notify/dto/email.dto';

@ApiTags('Onboard-company')
@Controller('onboard-company')
@Public()
export class OnboardController {
    constructor(private readonly onboardCompanyService: OnboardCompanyService) {}

    @Get('/index')
    @HttpCode(HttpStatus.OK)
    async helloIndex() {
        return { value: 'Hello Onboard Company Index' };
    }

    @Get('/users/:user_id')
    @HttpCode(HttpStatus.OK)
    async findUserCompany(@Param('user_id') user_id: string) {
        return this.onboardCompanyService.findOneByUserId(user_id);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findByCompanyName(@Query('company_name') company_name: string) {
        return this.onboardCompanyService.findOneByCompanyName(company_name);
    }

    @Get('/company-type')
    @HttpCode(HttpStatus.OK)
    async getCompanyTypes() {
        return this.onboardCompanyService.getActiveCompanyTypes();
    }

    @Get('/liquidate-unit')
    @HttpCode(HttpStatus.OK)
    async getLiquidateUnit() {
        return this.onboardCompanyService.getActiveLiquidateUnits();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createCompany(@Body() request: OnboardCompanyReqDto) {
        return this.onboardCompanyService.onboardNewCompany(request);
    }

    @Post('/:company_id/notify-admin-by-email')
    @HttpCode(HttpStatus.OK)
    async notifyAdminByEmail(@Param('company_id') company_id: string, @Body() email_user: EmailUserDto) {
        return this.onboardCompanyService.sendEmailNotificationToAdmin(company_id, email_user);
    }
}

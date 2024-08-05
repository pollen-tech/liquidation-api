import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { Auth0Service } from '../auth0/auth0.service';
import { ChannelName } from '../../../common/enums/common.enum';
import { PasswordLessNewUsersDto, ValidatePasswordLessUserReqDto } from '../dto/users.dto';

@ApiTags('AuthO Authentication')
@Controller('auth0')
@Public()
export class Auth0Controller {
    constructor(private readonly auth0Service: Auth0Service) {}

    @Get('/index')
    async helloIndex() {
        return { value: 'Hello Auth0 index' };
    }

    @Post('/password-less-email-login/:email')
    @HttpCode(HttpStatus.OK)
    async passwordLessEmailLogin(@Param('email') email: string) {
        console.log('email - ', email);
        return await this.auth0Service.sendPasswordLessOtpToEmail(email);
    }

    @Post('/password-less-email-otp-validate/:email')
    @HttpCode(HttpStatus.OK)
    async verifyPasswordLessEmailLogin(@Param('email') email: string, @Query('code') code: string, @Query('channel_code') channel_code: ChannelName) {
        return await this.auth0Service.validateOtpAndCreateUser(email, code, channel_code);
    }

    @Post('/pollen-pass/password-less-email-otp-validate/:email')
    @HttpCode(HttpStatus.OK)
    async verifyPollenPassPasswordLessEmailLogin(
        @Param('email') email: string,
        @Query('code') code: string,
        @Query('first_name') first_name: string,
        @Query('last_name') last_name: string,
    ) {
        return await this.auth0Service.validateOtpAndCreatePollenPassUser(email, code, first_name, last_name);
    }

    @Post('/pollen-pass/password-less-email-otp-validate')
    @HttpCode(HttpStatus.OK)
    async verifyPollenPassPasswordLessEmailLoginAndCreateChannel(@Body() requestDto: ValidatePasswordLessUserReqDto) {
        return await this.auth0Service.validateOtpAndCreatePollenPassUserAndChannel(requestDto);
    }
}

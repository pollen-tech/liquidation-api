import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { OTPService } from '../domain/otp.service';
import { SendOtpParam, VerifyOtpDto } from '../dto/send-otp.dto';

@ApiTags('Otp Message')
@Controller('otp')
@Public()
export class OtpController {
    constructor(private otpService: OTPService) {}

    @Get('/index')
    async helloIndex() {
        return { value: 'Hello OTP index' };
    }

    @Post('/send')
    async send(@Body() sendOtpParam: SendOtpParam) {
        return await this.otpService.sendOtp(sendOtpParam);
    }

    @Post('/validate-user-otp')
    async validateUserOtp(@Body() verifyOtpDto: VerifyOtpDto) {
        return await this.otpService.verifyOtp(verifyOtpDto);
    }

    @Post('/validate-otp')
    async validateOtp(@Query('mobile_no') email: string, @Query('code') code: string) {
        return { status_code: '200' };
    }
}

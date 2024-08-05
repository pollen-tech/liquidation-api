import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import awaitToError from 'src/common/await-to-error';
import { SendOtpParam, SendOtpRes, VerifyOtpDto, VerifyOtpRes } from '../dto/send-otp.dto';
import TwilioService from './twilio.service';
import { UserService } from './user.service';

@Injectable()
export class OTPService {
    constructor(
        private readonly twilioService: TwilioService,
        private readonly userService: UserService,
    ) {}

    async sendOtp(param: SendOtpParam): Promise<SendOtpRes> {
        let phone_no = '+' + param.country_code + param.phone_no;
        const [err] = await awaitToError(this.twilioService.sendOTP(phone_no, param.method));

        if (err) {
            throw new InternalServerErrorException('Something went wrong while sending OTP');
        }

        return {
            status_code: '200',
            message: `${param.method} has been sent successfully`,
        };
    }

    async verifyOtp(otp_data: VerifyOtpDto): Promise<SendOtpRes> {
        let phone_no = '+' + otp_data.country_code + otp_data.phone_no;
        const [err, verificationCheck] = await awaitToError(this.twilioService.verifyOTP(phone_no, otp_data.otp));
        if (err) {
            throw new InternalServerErrorException(err);
        }

        switch (verificationCheck.status) {
            case 'canceled':
                throw new BadRequestException('OTP has reached expiry time');
            case 'pending':
                throw new BadRequestException('OTP is not valid');
            case 'approved':
                await this.userService.updatePhoneNoAndVerification(otp_data.user_id, otp_data.country_code, otp_data.phone_no, true);
                //this.userService.sendWelcomeEmail(user);
                break;
        }
        return {
            status_code: '200',
            message: `OTP Verification status : ${verificationCheck.status.toUpperCase()} `,
        };
    }
}

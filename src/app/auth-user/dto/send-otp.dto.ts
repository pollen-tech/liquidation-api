import { IsIn, IsNotEmpty, IsPhoneNumber, IsString, IsUUID } from 'class-validator';
import { VerificationChannel } from 'twilio/lib/rest/verify/v2/service/verification';

export class SendOtpParam {
    @IsNotEmpty()
    country_code: number;

    @IsNotEmpty()
    phone_no: number;

    @IsIn(['sms', 'whatsapp', 'call'])
    @IsNotEmpty()
    method: VerificationChannel;
}

export class SendOtpRes {
    message: any;
    status_code: any;
}

export class VerifyOtpDto {
    @IsUUID()
    @IsNotEmpty()
    user_id: string;

    @IsNotEmpty()
    country_code: number;

    @IsNotEmpty()
    phone_no: number;

    @IsString()
    @IsNotEmpty()
    otp: string;
}

export class VerifyOtpRes {
    /**
     * The status of the verification. Can be: `pending`, `approved`, or `canceled`.
     */
    status: string;
}

export class SavePhoneNumberDto {
    @IsPhoneNumber()
    phoneNumber: string;
}

export class SavePhoneNumberRes {
    phoneNumber: string;
    isVerified: boolean;
}

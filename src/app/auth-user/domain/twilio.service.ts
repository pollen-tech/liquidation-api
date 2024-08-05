import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import TwilioSDK from 'twilio';
import { ServiceContext } from 'twilio/lib/rest/verify/v2/service';
import { VerificationChannel } from 'twilio/lib/rest/verify/v2/service/verification';

@Injectable()
export default class TwilioService {
    private client: TwilioSDK.Twilio;
    private twilioClientService: ServiceContext;

    constructor(configService: ConfigService) {
        this.client = TwilioSDK(configService.get('TWILIO_ACCOUNT_SID'), configService.get('TWILIO_AUTH_TOKEN'));

        this.initialize();
    }

    private async initialize() {
        try {
            const createVerificationService = await this.client.verify.v2.services.create({
                friendlyName: 'Pollen OTP',
            });

            this.twilioClientService = this.client.verify.v2.services(createVerificationService.sid);
        } catch (error) {
            console.log('twillio', error);
            throw new InternalServerErrorException(error);
        }
    }

    async sendOTP(phoneNumber: string, channel: VerificationChannel = 'sms') {
        return this.twilioClientService.verifications.create({
            to: phoneNumber,
            channel,
        });
    }

    async verifyOTP(phoneNumber: string, code: string) {
        return this.twilioClientService.verificationChecks.create({
            to: phoneNumber,
            code,
        });
    }
}

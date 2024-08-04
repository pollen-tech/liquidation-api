import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { UserEntity } from './repositories/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './domain/user.service';
import { UserRepository } from './repositories/user.repository';
import { Auth0Service } from './auth0/auth0.service';
import { Auth0Controller } from './controllers/auth0.controller';
import { OtpController } from './controllers/otp.controller';
import { OTPService } from './domain/otp.service';
import TwilioService from './domain/twilio.service';
import { NotifyModule } from '../notify/notify.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), DatabaseModule.forCustomRepository([UserRepository]), NotifyModule],
    providers: [UserService, Auth0Service, TwilioService, OTPService],
    controllers: [UserController, Auth0Controller, OtpController],
    exports: [TypeOrmModule, UserService, Auth0Service],
})
export class UserModule {}

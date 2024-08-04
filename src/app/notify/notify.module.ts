import { Module } from '@nestjs/common';
import { EmailNotificationService } from './domain/email.notification.service';
import { TestEmailController } from './test.email.controller';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [TestEmailController],
    providers: [EmailNotificationService],
    exports: [EmailNotificationService],
})
export class NotifyModule {}

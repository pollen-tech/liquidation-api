import { Controller, Get, Post } from '@nestjs/common';
import { EmailNotificationService } from './domain/email.notification.service';
import { Public } from 'nest-keycloak-connect';

@Public()
@Controller('test-email')
export class TestEmailController {
    constructor(private readonly emailNotificationService: EmailNotificationService) {}

    @Get()
    hello() {
        return { message: 'Hello, I am index page.' };
    }

    @Post('/send')
    send() {
        return this.emailNotificationService.testSendWelcomeEmail();
    }
}

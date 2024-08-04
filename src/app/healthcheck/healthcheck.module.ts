import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthcheckController } from './application/controllers/healthcheck.controller';

@Module({
    imports: [TerminusModule],
    controllers: [HealthcheckController],
    providers: [],
})
export class HealthcheckModule {}

import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { Public } from 'nest-keycloak-connect';
import { DatabaseHealthcheckService } from '../../../../database/database-healthcheck.service';

@Controller('healthcheck')
export class HealthcheckController {
    constructor(
        private health: HealthCheckService,
        private db: DatabaseHealthcheckService,
    ) {}

    @Public()
    @Get()
    @HealthCheck()
    check() {
        return this.health.check([() => this.db.pingDb()]);
    }
}

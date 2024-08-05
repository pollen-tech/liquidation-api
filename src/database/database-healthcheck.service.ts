import { Injectable } from '@nestjs/common';
import { TypeOrmHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class DatabaseHealthcheckService {
    constructor(private readonly db: TypeOrmHealthIndicator) {}
    pingDb() {
        return this.db.pingCheck('database');
    }
}

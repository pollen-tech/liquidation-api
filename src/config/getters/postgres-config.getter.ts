import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Injectable()
export class PostgresConfigGetter {
    constructor(private readonly configService: ConfigService) {}

    static validationSchema = {
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_LOGGING: Joi.string().optional(),
    };

    get host() {
        return this.configService.get<string>('POSTGRES_HOST');
    }

    get port() {
        return this.configService.get<number>('POSTGRES_PORT');
    }

    get user() {
        return this.configService.get<string>('POSTGRES_USER');
    }

    get password() {
        return this.configService.get<string>('POSTGRES_PASSWORD');
    }

    get db() {
        return this.configService.get<string>('POSTGRES_DB');
    }

    get logging() {
        return this.configService.get<string>('POSTGRES_LOGGING');
    }
}

import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpConfigService {
    createAxiosOptions(): AxiosRequestConfig {
        return {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer YOUR_TOKEN_HERE',
            },
        };
    }
}

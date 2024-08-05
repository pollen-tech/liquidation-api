import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private logger: Logger;
    constructor(loggerName: string) {
        this.logger = new Logger(loggerName);
    }
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let status = 500;
        if (exception instanceof EntityNotFoundError) {
            status = 404;
        } else if (exception.getStatus) {
            status = exception.getStatus();
        }
        this.logger.error(exception.message, exception.stack);
        const errorBody: Record<string, string | number> = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.path,
            stack: exception.stack,
            method: request.method,
        };
        const responseData = exception.getResponse ? exception.getResponse() : exception.message;
        if (typeof responseData === 'string') {
            errorBody.message = responseData;
        } else {
            Object.assign(errorBody, responseData);
        }
        response.status(status).json(errorBody);
    }
}

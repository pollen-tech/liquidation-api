import {ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, Logger} from '@nestjs/common';
import {Request, Response} from 'express';
import {EntityNotFoundError} from 'typeorm';
import {ApiErrorResDto} from "../dtos/id.dto";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private logger: Logger;

    constructor(loggerName: string) {
        this.logger = new Logger(loggerName);
    }

    catch(exception: HttpException, host: ArgumentsHost) {
        this.logger.error("[HttpExceptionFilter] Error caught: " + exception.message, exception.stack);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const {status_code, status} = this.filterException(exception)
        const responseData = exception.getResponse ? exception.getResponse() : exception.message;
        console.log('responseData', responseData);
        let error_msg = "Not defined";
        if (typeof responseData === 'string') {
            error_msg = responseData;
        } else {
            error_msg = responseData['message'];
        }
        const errorBody = this.errorMessage(request, status, status_code, error_msg)
        response.status(status_code).json(errorBody);
    }

    errorMessage(req: Request, status: string, status_code: number,
                 message: string) {
        const errorBody: ApiErrorResDto = {
            status_code: status_code,
            status: status,
            message: message,
            timestamp: new Date().toISOString(),
            path: req.path,
            method: req.method,
        };
        return errorBody;
    }

    filterException(exception: HttpException) {
        let status_code = 500;
        let status = "SERVER_ERROR";
        if (exception instanceof EntityNotFoundError) {
            status_code = 404;
            status = 'NO_DATA_FOUND'
        } else if (exception instanceof BadRequestException) {
            status_code = 400;
            status = 'BAD_REQUEST'
        } else if (exception.getStatus) {
            status_code = exception.getStatus();
        }
        return {status_code, status}
    }

}

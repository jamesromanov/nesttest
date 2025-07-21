import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { Request, Response } from 'express';

import { MongooseError } from 'mongoose';
import { MulterError } from 'multer';

@Catch()
// Global exception filter to catch all errors
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    console.log(exception);
    let message = 'Serverda xatolik';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception?.constructor) {
      case HttpException:
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException)?.message || message;
        break;
      case MongooseError:
        message = (exception as MongooseError).message;
        status = HttpStatus.CONFLICT;
        break;
      case ThrottlerException:
        message = "Bir vaqtda ko'p so'rovlar berildi. Iltimos kuting!";
        status = HttpStatus.TOO_MANY_REQUESTS;
        break;
      default:
        status = (exception as any).status || HttpStatus.INTERNAL_SERVER_ERROR;
        message = (exception as any)?.response?.message
          ? (exception as any)?.response?.message
          : (exception as any).message || message;
    }

    return response.status(status).json({
      success: false,
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

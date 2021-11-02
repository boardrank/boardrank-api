import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ApiErrorResponse } from 'libs/http-exceptions/api-error-response';
import { ErrorCode } from 'libs/http-exceptions/error-codes';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  static ErrorUnauthorized = new ApiErrorResponse(
    ErrorCode.Unauthorized,
    '유효하지 않은 토큰입니다.',
  );

  static ErrorForbidden = new ApiErrorResponse(
    ErrorCode.Forbidden,
    '권한이 없습니다.',
  );

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    switch (status) {
      case HttpStatus.UNAUTHORIZED:
        response.status(status).json(HttpExceptionFilter.ErrorUnauthorized);
        break;
      case HttpStatus.FORBIDDEN:
        response.status(status).json(HttpExceptionFilter.ErrorForbidden);
        break;
      default:
        break;
    }

    response.status(status).json(response.json);
  }
}

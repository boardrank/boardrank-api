import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ApiForbiddenErrorResponse } from 'libs/http-exceptions/api-forbidden-error-response';
import { ApiUnauthorizedErrorResponse } from 'libs/http-exceptions/api-unauthorized-error-response';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  static ErrorUnauthorized = new ApiUnauthorizedErrorResponse(
    '토큰이 올바르지 않습니다.',
  );

  static ErrorForbidden = new ApiForbiddenErrorResponse('권한이 없습니다.');

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
        response.status(status).json(exception.getResponse());
        break;
    }
  }
}

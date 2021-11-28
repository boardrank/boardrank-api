import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { JwtPayload, decode } from 'jsonwebtoken';
import { Request, Response } from 'express';

import { ApiExpiredTokenErrorResponse } from 'libs/http-exceptions/api-expired-token-error-response';
import { ApiForbiddenErrorResponse } from 'libs/http-exceptions/api-forbidden-error-response';
import { ApiUnauthorizedErrorResponse } from 'libs/http-exceptions/api-unauthorized-error-response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger('HttpExceptionFilter');

  static ErrorUnauthorized = new ApiUnauthorizedErrorResponse(
    '토큰이 올바르지 않습니다.',
  );

  static ErrorExpiredToken = new ApiExpiredTokenErrorResponse(
    '토큰이 만료되었습니다.',
  );

  static ErrorForbidden = new ApiForbiddenErrorResponse('권한이 없습니다.');

  checkExpiration({ headers: { authorization } }: Request) {
    try {
      if (!authorization) return false;
      if (!/^bearer /i.test(authorization)) return false;
      const token = authorization.replace(/^bearer /i, '');
      const { exp } = decode(token) as JwtPayload;
      if (exp < new Date().valueOf() / 1000) return true;
      return false;
    } catch (error) {
      return false;
    }
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();

    switch (status) {
      case HttpStatus.UNAUTHORIZED:
        const error = this.checkExpiration(req)
          ? HttpExceptionFilter.ErrorExpiredToken
          : HttpExceptionFilter.ErrorUnauthorized;
        res.status(status).json(error);
        break;
      case HttpStatus.FORBIDDEN:
        res.status(status).json(HttpExceptionFilter.ErrorForbidden);
        break;
      default:
        res.status(status).json(exception.getResponse());
        break;
    }
  }
}

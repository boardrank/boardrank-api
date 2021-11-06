import {
  ApiUnauthorizedResponse as Response,
  getSchemaPath,
} from '@nestjs/swagger';

import { ApiUnauthorizedErrorResponse } from 'libs/http-exceptions/api-unauthorized-error-response';
import { HttpExceptionFilter } from 'libs/filters/http-exception.filter';

export const ApiUnauthorizedResponse = () =>
  Response({
    description: HttpExceptionFilter.ErrorUnauthorized.toDescription(),
    schema: { $ref: getSchemaPath(ApiUnauthorizedErrorResponse) },
  });

import {
  ApiForbiddenResponse as Response,
  getSchemaPath,
} from '@nestjs/swagger';

import { ApiForbiddenErrorResponse } from 'libs/http-exceptions/api-forbidden-error-response';
import { HttpExceptionFilter } from 'libs/filters/http-exception.filter';

export const ApiForbiddenResponse = () =>
  Response({
    description: HttpExceptionFilter.ErrorForbidden.toDescription(),
    schema: { $ref: getSchemaPath(ApiForbiddenErrorResponse) },
  });

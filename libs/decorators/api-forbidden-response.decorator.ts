import { HttpExceptionFilter } from 'libs/filters/http-exception.filter';
import { ApiForbiddenResponse as Response } from '@nestjs/swagger';

export const ApiForbiddenResponse = () =>
  Response(HttpExceptionFilter.ErrorForbidden.toApiResponseOptions());

import { HttpExceptionFilter } from 'libs/filters/http-exception.filter';
import { ApiUnauthorizedResponse as Response } from '@nestjs/swagger';

export const ApiUnauthorizedResponse = () =>
  Response(HttpExceptionFilter.ErrorUnauthorized.toApiResponseOptions());

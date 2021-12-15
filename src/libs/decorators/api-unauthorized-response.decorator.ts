import { HttpExceptionFilter } from 'src/libs/filters/http-exception.filter';
import { ApiUnauthorizedResponse as Response } from '@nestjs/swagger';

export const ApiUnauthorizedResponse = () =>
  Response(HttpExceptionFilter.ErrorUnauthorized.toApiResponseOptions());

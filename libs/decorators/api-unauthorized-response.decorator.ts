import { HttpExceptionFilter } from 'libs/filters/http-exception.filter';
import { ApiUnauthorizedResponse as Response } from '@nestjs/swagger';

export const ApiUnauthorizedResponse = () =>
  Response({
    description: HttpExceptionFilter.ErrorUnauthorized.toDescription(),
  });

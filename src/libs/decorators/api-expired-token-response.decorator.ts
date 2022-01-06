import { HttpExceptionFilter } from 'src/libs/filters/http-exception.filter';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

export const ApiExpiredTokenResponse = () =>
  ApiUnauthorizedResponse(
    HttpExceptionFilter.ErrorExpiredToken.toApiResponseOptions(),
  );

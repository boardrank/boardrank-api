import { HttpExceptionFilter } from 'libs/filters/http-exception.filter';
import { ApiForbiddenResponse as Response } from '@nestjs/swagger';
import { ErrorCode } from 'libs/http-exceptions/error-codes';

export const ApiForbiddenResponse = (errorCode: number) => {
  switch (errorCode) {
    case ErrorCode.Forbidden:
      return Response(
        HttpExceptionFilter.ErrorForbidden.toApiResponseOptions(),
      );

    case ErrorCode.NoPermission:
      return Response(
        HttpExceptionFilter.ErrorNoPermission.toApiResponseOptions(),
      );
    case ErrorCode.BlockStatus:
      return Response(
        HttpExceptionFilter.ErrorBlockStatus.toApiResponseOptions(),
      );
    case ErrorCode.DormantStatus:
      return Response(
        HttpExceptionFilter.ErrorDormantStatus.toApiResponseOptions(),
      );
    default:
      throw new Error('Invalid errorCode');
  }
};

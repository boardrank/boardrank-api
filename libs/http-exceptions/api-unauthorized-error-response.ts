import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiErrorResponse } from './api-error-response';
import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiUnauthorizedErrorResponse extends ApiErrorResponse {
  constructor(errorMsg: string) {
    super(ErrorCode.Unauthorized, errorMsg);
  }

  @ApiProperty({
    default: ErrorCode.Unauthorized,
  })
  errorCode: number;
}

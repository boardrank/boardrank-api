import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiErrorResponse } from './api-error-response';
import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiExpiredTokenErrorResponse extends ApiErrorResponse {
  constructor(errorMsg: string) {
    super(ErrorCode.ExpiredToken, errorMsg);
  }

  @ApiProperty({
    default: ErrorCode.ExpiredToken,
    type: Number,
  })
  readonly errorCode: number = ErrorCode.ExpiredToken;
}

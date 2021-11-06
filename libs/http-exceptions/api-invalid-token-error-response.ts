import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiErrorResponse } from './api-error-response';
import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiInvalidTokenErrorResponse extends ApiErrorResponse {
  constructor(errorMsg: string) {
    super(ErrorCode.InvalidToken, errorMsg);
  }

  @ApiProperty({
    default: ErrorCode.InvalidToken,
  })
  errorCode: number;
}

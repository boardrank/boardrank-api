import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiErrorResponse } from './api-error-response';
import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiInvalidParamErrorResponse extends ApiErrorResponse {
  constructor(errorMsg: string) {
    super(ErrorCode.InvalidParam, errorMsg);
  }

  @ApiProperty({
    default: ErrorCode.InvalidParam,
    type: Number,
    enum: null,
  })
  errorCode: ErrorCode.InvalidParam;
}

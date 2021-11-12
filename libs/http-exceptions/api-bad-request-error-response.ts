import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiErrorResponse } from './api-error-response';
import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiBadRequestErrorResponse extends ApiErrorResponse {
  constructor(errorMsg: string) {
    super(ErrorCode.BadRequest, errorMsg);
  }

  @ApiProperty({
    default: ErrorCode.BadRequest,
    type: Number,
    enum: null,
  })
  errorCode: ErrorCode.BadRequest;
}

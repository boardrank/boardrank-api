import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiErrorResponse } from './api-error-response';
import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiHasReferenceErrorResponse extends ApiErrorResponse {
  constructor(errorMsg: string) {
    super(ErrorCode.HasReference, errorMsg);
  }

  @ApiProperty({
    default: ErrorCode.HasReference,
    type: Number,
    enum: null,
  })
  errorCode: ErrorCode.HasReference;
}

import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiErrorResponse } from './api-error-response';
import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiBlockStatusErrorResponse extends ApiErrorResponse {
  constructor(errorMsg: string) {
    super(ErrorCode.BlockStatus, errorMsg);
  }

  @ApiProperty({
    default: ErrorCode.BlockStatus,
    type: Number,
  })
  readonly errorCode: number = ErrorCode.BlockStatus;
}

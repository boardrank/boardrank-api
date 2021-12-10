import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiErrorResponse } from './api-error-response';
import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiInvalidDataErrorResponse extends ApiErrorResponse {
  constructor(errorMsg: string) {
    super(ErrorCode.InvalidData, errorMsg);
  }

  @ApiProperty({
    default: ErrorCode.InvalidData,
    type: Number,
  })
  readonly errorCode: number = ErrorCode.InvalidData;
}

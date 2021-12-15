import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiErrorResponse } from './api-error-response';
import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiDormantStatusErrorResponse extends ApiErrorResponse {
  constructor(errorMsg: string) {
    super(ErrorCode.DormantStatus, errorMsg);
  }

  @ApiProperty({
    default: ErrorCode.DormantStatus,
    type: Number,
  })
  readonly errorCode: number = ErrorCode.DormantStatus;
}

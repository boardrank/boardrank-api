import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiErrorResponse } from './api-error-response';
import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiForbiddenErrorResponse extends ApiErrorResponse {
  constructor(errorMsg: string) {
    super(ErrorCode.Forbidden, errorMsg);
  }

  @ApiProperty({
    default: ErrorCode.Forbidden,
  })
  errorCode: number;
}

import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiErrorResponse } from './api-error-response';
import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiNotFoundErrorResponse extends ApiErrorResponse {
  constructor(errorMsg: string) {
    super(ErrorCode.NotFound, errorMsg);
  }

  @ApiProperty({
    default: ErrorCode.NotFound,
  })
  errorCode: number;
}

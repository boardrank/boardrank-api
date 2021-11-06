import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiErrorResponse } from './api-error-response';
import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiConflictErrorResponse extends ApiErrorResponse {
  constructor(errorMsg: string) {
    super(ErrorCode.Conflict, errorMsg);
  }

  @ApiProperty({
    default: ErrorCode.Conflict,
  })
  errorCode: number;
}

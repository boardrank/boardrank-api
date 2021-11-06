import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiErrorResponse } from './api-error-response';
import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiAlreadyRegisteredErrorResponse extends ApiErrorResponse {
  constructor(errorMsg: string) {
    super(ErrorCode.AlreadyRegistered, errorMsg);
  }

  @ApiProperty({
    default: ErrorCode.AlreadyRegistered,
  })
  errorCode: number;
}

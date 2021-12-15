import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ApiErrorResponse } from './api-error-response';
import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiNoPermissionErrorResponse extends ApiErrorResponse {
  constructor(errorMsg: string) {
    super(ErrorCode.NoPermission, errorMsg);
  }

  @ApiProperty({
    default: ErrorCode.NoPermission,
    type: Number,
  })
  readonly errorCode: number = ErrorCode.NoPermission;
}

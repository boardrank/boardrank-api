import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiErrorResponse {
  constructor(errorCode: ErrorCode, errorMsg: string) {
    this.errorCode = errorCode;
    this.errorMsg = errorMsg;
  }

  toDescription() {
    return JSON.stringify(
      {
        errorCode: this.errorCode,
        errorMsg: this.errorMsg,
      },
      null,
      2,
    );
  }

  @ApiProperty()
  errorCode: number;

  @ApiProperty()
  errorMsg: string;
}

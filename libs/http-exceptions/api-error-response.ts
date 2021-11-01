import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiErrorResponse {
  constructor(errorCode: ErrorCode, errorMsg: string) {
    this.errorCode = errorCode;
    this.errorMsg = errorMsg;
  }

  toDescription() {
    return `errorCode: ${this.errorCode}, errorMsg: ${this.errorMsg}`;
  }

  @ApiProperty()
  errorCode: number;

  @ApiProperty()
  errorMsg: string;
}

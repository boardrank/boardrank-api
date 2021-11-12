import {
  ApiExtraModels,
  ApiProperty,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';

import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiErrorResponse {
  constructor(errorCode: ErrorCode, errorMsg: string) {
    this.errorCode = errorCode;
    this.errorMsg = errorMsg;
  }

  @ApiProperty({
    type: Number,
    enum: Object.values(ErrorCode).filter(
      (value) => !isNaN(parseInt(value as string)),
    ),
  })
  errorCode: ErrorCode;

  @ApiProperty()
  errorMsg: string;

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

  toApiResponseOptions(): ApiResponseOptions {
    return {
      description: this.toDescription(),
      schema: { $ref: getSchemaPath(this.constructor.name) },
    };
  }
}

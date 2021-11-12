import {
  ApiExtraModels,
  ApiProperty,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorCode } from './error-codes';

@ApiExtraModels()
export class ApiErrorResponse {
  constructor(errorCode: number, errorMsg: string) {
    this.errorCode = errorCode;
    this.errorMsg = errorMsg;
  }

  @ApiProperty({
    type: Number,
    description: Object.entries(ErrorCode)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', '),
  })
  readonly errorCode: number;

  @ApiProperty()
  readonly errorMsg: string;

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

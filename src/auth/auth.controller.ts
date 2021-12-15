import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { SwaggerTag } from 'src/libs/constants';
import { HttpExceptionFilter } from 'src/libs/filters/http-exception.filter';
import { AuthService } from './auth.service';
import { ApiPostAuthRefreshReqBody } from './schemas/api-post-auth-refresh-req-body.schema';
import { ApiPostAuthRefreshResData } from './schemas/api-post-auth-refresh-res-data.schema';
import { ApiPostAuthSignInReqBody } from './schemas/api-post-auth-sign-in-req-body.schema';
import { ApiPostAuthSignInResData } from './schemas/api-post-auth-sign-in-res-data.schema';
import { ApiPostAuthSignUpReqBody } from './schemas/api-post-auth-sign-up-req-body.schema';
import { ApiPostAuthSignUpResData } from './schemas/api-post-auth-sign-up-res-data.schema';

@ApiTags(SwaggerTag.Authentication)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(ApiPostAuthSignUpResData) },
  })
  @ApiBadRequestResponse(AuthService.ErrorInvalidToken.toApiResponseOptions())
  @ApiConflictResponse(
    AuthService.ErrorAlreadyRegistered.toApiResponseOptions(),
  )
  async signUp(
    @Body() body: ApiPostAuthSignUpReqBody,
  ): Promise<ApiPostAuthSignUpResData> {
    return await this.authService.signUp(body.idToken);
  }

  @Post('sign-in')
  @HttpCode(200)
  @ApiOkResponse({ schema: { $ref: getSchemaPath(ApiPostAuthSignInResData) } })
  @ApiBadRequestResponse(AuthService.ErrorInvalidToken.toApiResponseOptions())
  @ApiNotFoundResponse(AuthService.ErrorNotFoundUser.toApiResponseOptions())
  @ApiForbiddenResponse(
    HttpExceptionFilter.ErrorBlockStatus.toApiResponseOptions(),
  )
  @ApiForbiddenResponse(
    HttpExceptionFilter.ErrorDormantStatus.toApiResponseOptions(),
  )
  async signIn(
    @Body() body: ApiPostAuthSignInReqBody,
  ): Promise<ApiPostAuthSignInResData> {
    return await this.authService.signIn(body.idToken);
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiOkResponse({ schema: { $ref: getSchemaPath(ApiPostAuthRefreshResData) } })
  @ApiBadRequestResponse(AuthService.ErrorInvalidToken.toApiResponseOptions())
  @ApiForbiddenResponse(
    HttpExceptionFilter.ErrorBlockStatus.toApiResponseOptions(),
  )
  @ApiForbiddenResponse(
    HttpExceptionFilter.ErrorDormantStatus.toApiResponseOptions(),
  )
  async refresh(
    @Body() body: ApiPostAuthRefreshReqBody,
  ): Promise<ApiPostAuthRefreshResData> {
    return await this.authService.refresh(body.refreshToken);
  }
}

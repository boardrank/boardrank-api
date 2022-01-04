import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
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
import { Request, Response } from 'express';
import { refreshToken } from 'firebase-admin/app';
import { SwaggerTag } from 'src/libs/constants';
import { HttpExceptionFilter } from 'src/libs/filters/http-exception.filter';
import { AuthService, REFRESH_TOKEN_KEY } from './auth.service';
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
    @Res({ passthrough: true }) res: Response,
    @Body() body: ApiPostAuthSignUpReqBody,
  ): Promise<ApiPostAuthSignUpResData> {
    const { accessToken, refreshToken } = await this.authService.signUp(
      body.idToken,
    );
    this.authService.setRefreshTokenToCookie(res, refreshToken);
    return { accessToken };
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
    @Res({ passthrough: true }) res: Response,
    @Body() body: ApiPostAuthSignInReqBody,
  ): Promise<ApiPostAuthSignInResData> {
    const { accessToken, refreshToken } = await this.authService.signIn(
      body.idToken,
    );
    this.authService.setRefreshTokenToCookie(res, refreshToken);
    return { accessToken };
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
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() body: ApiPostAuthRefreshReqBody,
  ): Promise<ApiPostAuthRefreshResData> {
    try {
      const { accessToken, refreshToken } = await this.authService.refresh(
        req.cookies[REFRESH_TOKEN_KEY] || body.refreshToken,
      );
      this.authService.setRefreshTokenToCookie(res, refreshToken);
      return { accessToken };
    } catch (error) {
      res.clearCookie(REFRESH_TOKEN_KEY);
      throw error;
    }
  }

  @Delete('sign-out')
  @HttpCode(200)
  @ApiOkResponse(null)
  signOut(@Res({ passthrough: true }) res: Response) {
    if (res.cookie[REFRESH_TOKEN_KEY]) {
      this.authService.removeRefreshToken(res.cookie[REFRESH_TOKEN_KEY]);
    }
    res.clearCookie(REFRESH_TOKEN_KEY);
    return null;
  }
}

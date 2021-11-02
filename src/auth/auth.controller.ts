import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { SwaggerTag } from 'libs/constants';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiAuthResponse } from './entities/api-auth-response';

@ApiTags(SwaggerTag.Authentication)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiCreatedResponse({
    schema: { $ref: getSchemaPath(ApiAuthResponse) },
  })
  @ApiBadRequestResponse({
    description: AuthService.ErrorInvalidIdToken.toDescription(),
  })
  @ApiConflictResponse({
    description: AuthService.ErrorAlreadyRegistered.toDescription(),
  })
  async signUp(@Body() body: SignUpDto) {
    return await this.authService.signUp(body.idToken);
  }

  @Post('sign-in')
  @HttpCode(200)
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiAuthResponse) },
  })
  @ApiBadRequestResponse({
    description: AuthService.ErrorInvalidIdToken.toDescription(),
  })
  @ApiNotFoundResponse({
    description: AuthService.ErrorNotFoundUser.toDescription(),
  })
  async signIn(@Body() body: SignInDto) {
    return await this.authService.signIn(body.idToken);
  }

  @Post('sign-in/refresh')
  @HttpCode(200)
  @ApiOkResponse({
    schema: { $ref: getSchemaPath(ApiAuthResponse) },
  })
  @ApiBadRequestResponse({
    description: AuthService.ErrorInvalidIdToken.toDescription(),
  })
  async refresh(@Body() body: RefreshDto) {
    return await this.authService.refresh(body.refreshToken);
  }
}

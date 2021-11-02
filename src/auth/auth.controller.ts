import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerTag } from 'libs/constants';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags(SwaggerTag.Authentication)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpDto) {
    return await this.authService.signUp(body.idToken);
  }

  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() body: SignInDto) {
    return await this.authService.signIn(body.idToken);
  }

  @Post('sign-in/refresh')
  @HttpCode(200)
  async refresh(@Body() body: RefreshDto) {
    return await this.authService.refresh(body.refreshToken);
  }
}

import { Injectable } from '@nestjs/common';
import { ApiAuthResponse } from './entities/api-auth-response';

@Injectable()
export class AuthService {
  async signUp(idToken: string): Promise<ApiAuthResponse> {
    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
  }

  async signIn(idToken: string): Promise<ApiAuthResponse> {
    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
  }

  async refresh(idToken: string): Promise<ApiAuthResponse> {
    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
  }
}

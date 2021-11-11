import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /sign-up', () => {
    it('should be return bad request when using invalid id token', async () => {
      try {
        await controller.signUp({ idToken: '' });
      } catch (error) {
        expect(error).toEqual(
          new BadRequestException(AuthService.ErrorInvalidToken),
        );
      }
    });
  });

  describe('POST /sign-in', () => {
    it('should be return bad request when using invalid id token', async () => {
      try {
        await controller.signIn({ idToken: '' });
      } catch (error) {
        expect(error).toEqual(
          new BadRequestException(AuthService.ErrorInvalidToken),
        );
      }
    });
  });

  describe('POST /refresh', () => {
    it('should be return bad request when using invalid id token', async () => {
      try {
        await controller.refresh({ refreshToken: '' });
      } catch (error) {
        expect(error).toEqual(
          new BadRequestException(AuthService.ErrorInvalidToken),
        );
      }
    });
  });
});

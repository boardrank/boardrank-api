import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/libs/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { UploadFileModule } from 'src/upload-file/upload-file.module';

export const DynamicJwtModule = JwtModule.register({
  signOptions: {
    expiresIn: process.env.NODE_ENV === 'production' ? '30m' : '8h',
  },
});

@Module({
  imports: [DynamicJwtModule, UploadFileModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, JwtStrategy],
})
export class AuthModule {}

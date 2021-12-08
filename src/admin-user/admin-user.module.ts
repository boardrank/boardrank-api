import { AdminUserController } from './admin-user.controller';
import { AdminUserService } from './admin-user.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AdminUserController],
  providers: [AdminUserService, PrismaService],
})
export class AdminUserModule {}

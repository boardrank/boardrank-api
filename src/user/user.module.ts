import { Module } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadFileModule } from 'src/upload-file/upload-file.module';
import { UploadFileService } from 'src/upload-file/upload-file.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [UploadFileModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, UploadFileService, FirebaseService],
})
export class UserModule {}

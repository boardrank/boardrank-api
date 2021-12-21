import { AdminBoardGameController } from './admin-board-game.controller';
import { AdminBoardGameService } from './admin-board-game.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadFileModule } from 'src/upload-file/upload-file.module';
import { UploadFileService } from 'src/upload-file/upload-file.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  imports: [UploadFileModule],
  controllers: [AdminBoardGameController],
  providers: [
    AdminBoardGameService,
    PrismaService,
    UploadFileService,
    FirebaseService,
  ],
})
export class AdminBoardGameModule {}

import { Module } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UploadFileService } from './upload-file.service';

@Module({
  providers: [UploadFileService, FirebaseService],
  exports: [UploadFileService, FirebaseService],
})
export class UploadFileModule {}

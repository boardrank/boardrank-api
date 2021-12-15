import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import sharp from 'sharp';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadFileService {
  prefix = process.env.NODE_ENV === 'production' ? '' : 'dev/';
  resizeQueue: Express.Multer.File[] = [];
  boardGameResizes: [256, 512];

  constructor(private readonly firebaseService: FirebaseService) {
    if (!fs.existsSync('temp')) fs.mkdirSync('temp');
  }

  async uploadBoardGameImage(file: Express.Multer.File) {
    try {
      const baseUrl = this.prefix + 'image/board-game';
      const fileName = uuidv4() + '.jpeg';
      const filePath = `temp/${fileName}`;
      await sharp().toFile(filePath);
      const url = await this.firebaseService.uploadFile(
        filePath,
        `${baseUrl}/origin/${fileName}`,
      );
      return url;
    } catch (error) {
      throw error;
    }
  }
}

import { Injectable, Logger } from '@nestjs/common';

import { FirebaseService } from 'src/firebase/firebase.service';
import fs from 'fs';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

interface ResizeFile {
  file: Express.Multer.File;
  baseUrl: string;
  width: number;
  fileName: string;
  retry: number;
}
@Injectable()
export class UploadFileService {
  logger = new Logger('UploadFileService');
  prefix = process.env.NODE_ENV === 'production' ? '' : 'dev';
  resizeQueue: ResizeFile[] = [];
  isResizing = false;

  constructor(private readonly firebaseService: FirebaseService) {
    if (!fs.existsSync('temp')) fs.mkdirSync('temp');
    if (!fs.existsSync('temp/origin')) fs.mkdirSync('temp/origin');
    if (!fs.existsSync('temp/512')) fs.mkdirSync('temp/512');
    if (!fs.existsSync('temp/256')) fs.mkdirSync('temp/256');
    if (!fs.existsSync('temp/96')) fs.mkdirSync('temp/96');
    if (!fs.existsSync('temp/48')) fs.mkdirSync('temp/48');
  }

  async uploadBoardGameImage(file: Express.Multer.File) {
    try {
      return await this.uploadImage(file, 'board-game', [512, 256]);
    } catch (error) {
      throw error;
    }
  }

  async uploadProfile(file: Express.Multer.File) {
    try {
      return await this.uploadImage(file, 'profile', [512, 256, 96, 48]);
    } catch (error) {
      throw error;
    }
  }

  async uploadImage(
    file: Express.Multer.File,
    detailPath: string,
    widths: number[],
  ) {
    try {
      const baseUrl = `${this.prefix}/image/${detailPath}`;
      const fileName = uuidv4() + '.jpeg';
      const filePath = `temp/origin/${fileName}`;

      /**
       * buffer to file
       */
      await sharp(file.buffer).toFile(filePath);
      /**
       * upload to firebase storage
       */
      const url = await this.firebaseService.uploadFile(
        filePath,
        `${baseUrl}/origin/${fileName}`,
      );
      /**
       * delete temp file
       */
      fs.unlink(filePath, (error) => {
        if (error) throw error;
      });

      widths.forEach((width) =>
        this.resizeQueue.push({
          file,
          baseUrl,
          width,
          fileName,
          retry: 0,
        }),
      );

      this.resizeImage();
      return url;
    } catch (error) {
      throw error;
    }
  }

  async resizeImage() {
    try {
      if (this.isResizing) return;
      this.isResizing = true;
      while (this.resizeQueue.length > 0) {
        const { file, baseUrl, width, fileName, retry } =
          this.resizeQueue.shift();
        const filePath = `temp/${width}/${fileName}`;
        try {
          await sharp(file.buffer).resize(width).toFile(filePath);
          const url = await this.firebaseService.uploadFile(
            filePath,
            `${baseUrl}/${width}/${fileName}`,
          );
          this.logger.log(`${url} successfully uploaded`);
        } catch (error) {
          if (retry < 5) {
            this.resizeQueue.push({
              file,
              baseUrl,
              width,
              fileName,
              retry: retry + 1,
            });
          } else {
            this.logger.error(error.message);
          }
        } finally {
          fs.access(filePath, (error) => {
            if (!error) {
              fs.unlink(filePath, (error) => {
                if (error) throw error;
              });
            }
          });
        }
      }
      this.isResizing = false;
    } catch (error) {
      throw error;
    }
  }
}

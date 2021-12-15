import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import serviceAccountKey from './serviceAccountKey.json';

@Injectable()
export class FirebaseService {
  app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: serviceAccountKey.project_id,
      clientEmail: serviceAccountKey.client_id,
      privateKey: serviceAccountKey.private_key,
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });

  /**
   * @param filePath The path to your file to upload 'path/to/your/file'
   * @param destFileName The new ID for your GCS file 'your-new-file-name'
   */
  async uploadFile(filePath: string, fileName: string): Promise<string> {
    try {
      const [_, meta] = await this.app.storage().bucket().upload(filePath, {
        destination: fileName,
      });

      return (
        meta.selfLink.replace(
          'https://www.googleapis.com/storage/v1',
          'https://firebasestorage.googleapis.com/v0',
        ) + '?alt=media'
      );
    } catch (error) {
      throw error;
    }
  }
}

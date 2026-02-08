import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
  IMAGE = 'image',
}

const baseUrl = 'http://localhost:7777/';

@Injectable()
export class FileService {
  createFile(type: FileType, file): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return baseUrl + type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteFile(fileUrl: string) {
    try {
      // Видаляємо baseUrl, якщо він присутній
      const filePath = fileUrl.replace(baseUrl, '');

      // Отримуємо абсолютний шлях до файлу
      const absolutePath = path.resolve(__dirname, '..', 'static', filePath);

      // Перевіряємо, чи існує файл
      if (!fs.existsSync(absolutePath)) {
        throw new HttpException(
          `File not found: ${filePath}`,
          HttpStatus.NOT_FOUND,
        );
      }

      // Видаляємо файл
      fs.unlinkSync(absolutePath);
      console.log(filePath + ' was deleted');
    } catch (e) {
      throw new HttpException(
        `Failed to delete file: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

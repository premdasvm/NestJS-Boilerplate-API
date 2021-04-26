import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';

interface options {
  path: string;
}

export const storage = ({ path }: options): MulterOptions => {
  return {
    storage: diskStorage({
      destination: path,
      filename: (req, file, cb) => {
        const fileNameSplit = file.originalname.split('.');
        const fileExt = fileNameSplit[fileNameSplit.length - 1];
        const random = Math.floor(Math.random() * 100 + 1);
        cb(null, `${Date.now()}_${random}.${fileExt}`);
      },
    }),
    fileFilter: imageFileFilter,
  };
};

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new HttpException('Only (jpg, jpeg, png) image files are allowed!', HttpStatus.BAD_REQUEST));
  }
  callback(null, true);
};

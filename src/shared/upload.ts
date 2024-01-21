import multer from 'multer';
import {UPLOAD_FOLDER} from './constants';

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, UPLOAD_FOLDER);
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({storage});

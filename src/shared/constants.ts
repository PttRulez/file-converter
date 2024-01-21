import path from 'path';
import * as fs from 'fs';

export const VALID_FORMATS = [
  'heic',
  'heif',
  'avif',
  'jpeg',
  'jpg',
  'jpe',
  'tile',
  'dz',
  'png',
  'rawwsf',
  'tif',
  'webp',
  'gif',
  'jp2',
  'jpx',
  'j2k',
  'j2c',
  'jxl',
];

export const INPUT_FOLDER = path.join(__dirname, '../..', 'static', 'input');
export const UPLOAD_FOLDER = path.join(__dirname, '../..', 'static', 'upload');
export const CONVERTED_FOLDER = path.join(
  __dirname,
  '../..',
  'static',
  'converted'
);

if (!fs.existsSync(INPUT_FOLDER)) {
  fs.mkdirSync(INPUT_FOLDER);
}

if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER);
}

if (!fs.existsSync(CONVERTED_FOLDER)) {
  fs.mkdirSync(CONVERTED_FOLDER);
}

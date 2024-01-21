import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import {FormatEnum} from 'sharp';
import {CONVERTED_FOLDER, VALID_FORMATS} from '../shared/constants';
import {unlink} from 'fs/promises';
import logger from '../shared/logger';

export type ConvertOptions = {
  destinationFilePath?: string;
  format: keyof FormatEnum;
  sourceFilePath: string;
  unlinkAfter?: boolean;
};

export const convertFile = async (options: ConvertOptions) => {
  const {destinationFilePath, format, sourceFilePath, unlinkAfter} = options;
  // const destinationFilePath = options.destinationFilePath;

  if (!VALID_FORMATS.includes(format))
    throw new Error(
      `Неверный формат! (Доступные форматы: 'heic, heif, avif, jpeg, jpg, jpe, tile, dz, png, raw, 
       tiff, tif, webp, gif, jp2, jpx, j2k, j2c, jxl')`
    );

  const fileName = path.basename(sourceFilePath);
  logger.warning(fileName, 'CONVERT STARTED');

  let destFolder: string;
  if (destinationFilePath) {
    destFolder = path.dirname(destinationFilePath);
  } else {
    destFolder = path.join(CONVERTED_FOLDER, format);
  }

  if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder, {recursive: true});
  }

  await sharp(sourceFilePath)
    .toFormat(format, {mozjpeg: true})
    .toFile(
      destinationFilePath ??
        path.join(destFolder, path.parse(fileName).name + '.' + format)
    );

  logger.debug(`${fileName}`, 'CONVERTING COMPLETED');

  if (unlinkAfter) {
    unlink(sourceFilePath);
  }

  return fileName;
};

import * as fs from 'fs';
import * as path from 'path';
import {INPUT_FOLDER} from '../shared/constants';
import {convertFile} from '../converter/converter.service';
import {FormatEnum} from 'sharp';

export const startCLI = async () => {
  try {
    const format = process.argv[2] as keyof FormatEnum;

    if (!format)
      throw new Error("Введите формат (Например 'npm run convert webp')");

    const fileNames = fs.readdirSync(INPUT_FOLDER);

    for (const fileName of fileNames) {
      const sourceFilePath = path.join(INPUT_FOLDER, fileName);

      try {
        await convertFile({sourceFilePath, format});
      } catch (e: any) {
        console.log(e.message);
        break;
      }
    }
  } catch (e: any) {
    console.log(e.message);
  }
};

import path from 'path';
import express, {Request, Response} from 'express';
import {upload} from '../shared/upload';
import {v4 as uuid} from 'uuid';
import {CONVERTED_FOLDER, UPLOAD_FOLDER} from '../shared/constants';
import {freeManager} from '..';

const router = express.Router();

router.post('/', upload.array('files'), (req: Request, res: Response) => {
  const format = req.body.format;
  const userId = req.user?.id;

  const files = req.files as Express.Multer.File[];

  const response = [];

  // Promise.all
  for (const file of files) {
    if (file.size / 1_000_000 > 50) continue;

    const fileUid = uuid();
    const fileName = fileUid + '.' + format;

    const destinationFilePath = path.join(
      CONVERTED_FOLDER,
      userId ? String(userId) : 'free',
      fileName
    );

    response.push(fileName);

    freeManager.addTask({
      convertOptions: {
        destinationFilePath,
        format,
        sourceFilePath: path.join(UPLOAD_FOLDER, file.originalname),
        unlinkAfter: true,
      },
      fileData: file,
    });
  }

  freeManager.next();

  return res.status(202).send(response);
});

router.get('/test', (req: Request, res: Response) => {
  res.send('/convert/test response');
});

export default router;

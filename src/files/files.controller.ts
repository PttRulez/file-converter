import express, {Request, Response} from 'express';
import {CONVERTED_FOLDER} from '../shared/constants';
import path from 'path';
import {existsSync} from 'fs';

const router = express.Router();

router.get('/:fileName', (req: Request, res: Response) => {
  // req.params;
  console.log(req.params);
  console.log(req.query);
  const userId = req.query.userId as string;
  const fileName = req.params.fileName;
  const filePath = path.join(CONVERTED_FOLDER, userId, fileName);

  if (existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({message: 'Такого файла нет'});
  }
});

export default router;

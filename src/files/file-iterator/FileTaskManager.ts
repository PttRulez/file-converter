import {ConvertOptions, convertFile} from '../../converter/converter.service';
import logger from '../../shared/logger';

interface FileTask {
  convertOptions: ConvertOptions;
  fileData: Express.Multer.File;
}

export class FileTaskManager {
  private concurrentLimit: number;
  private currentlyConvertedCount: number;
  private fileTaskList: Array<FileTask>;
  private userId?: string;

  constructor(concurrentLimit: number, paidUserId?: string) {
    this.concurrentLimit = concurrentLimit;
    this.currentlyConvertedCount = 0;
    this.fileTaskList = [];
    this.userId = paidUserId;
  }

  addTask(task: FileTask): void {
    logger.info(`Added task to convert ${task.fileData.originalname}`);
    this.fileTaskList.push(task);
  }

  next(): void {
    logger.info(`${this.currentlyConvertedCount}`, 'NEXT CALLED');

    if (
      this.currentlyConvertedCount >= this.concurrentLimit ||
      this.fileTaskList.length === 0
    ) {
      logger.info(`${this.currentlyConvertedCount}`, 'NEXT RETURNED');
      return;
    }

    const fileTask = this.fileTaskList.shift()!;
    logger.info(`shifted ${fileTask.fileData.originalname}`);
    this.currentlyConvertedCount++;

    convertFile({...fileTask?.convertOptions}).then((fileName: string) => {
      this.currentlyConvertedCount--;
      logger.warning(
        `${fileName} ${this.currentlyConvertedCount}`,
        'HAS BEEN CONVERTED'
      );
      logger.info(
        'convertFile Promise.then(fileManager.next())',
        'CALLING NEXT'
      );
      this.next();
    });

    if (this.currentlyConvertedCount < this.concurrentLimit) {
      logger.info('from inside of next itself', 'CALLING NEXT');
      this.next();
    }
  }
}

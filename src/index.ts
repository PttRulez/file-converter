import express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import passport from './auth/passport.setup';
import dotenv from 'dotenv';
import morgan from 'morgan';
import rootRouter from './router/root-router';
import {FileTaskManager} from './files/file-iterator/FileTaskManager';

dotenv.config();

const app = express();
const port = process.env.PORT;

export const freeManager = new FileTaskManager(
  parseInt(process.env.FREE_CONCURRENT_CONVERTION_LIMIT!)
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (!fs.existsSync(path.join('..', 'static'))) {
  fs.mkdirSync(path.join('..', 'static'));
}

app.use(express.static(path.join('..', 'static')));
app.use(passport.initialize());

app.use(morgan('dev'));
app.use(rootRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

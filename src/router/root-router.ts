import express from 'express';
import convertController from '../converter/converter.controller';
import fileController from '../files/files.controller';
import authController from '../auth/auth.controller';
import passport from '../auth/passport.setup';

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('lol');
  res.status(200).send('Zdarova pediki');
});

router.get(
  '/private',
  passport.authenticate('bearer', {session: false}),
  (req, res, next) => res.send('you got to private route')
);

router.use('/convert', convertController);
router.use('/files', fileController);
router.use('/auth', authController);

export default router;

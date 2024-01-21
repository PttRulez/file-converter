import express, {NextFunction, Request, Response} from 'express';
import passport from './passport.setup';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: Express.User) => {
    if (err) return next(err);
    console.log('From /POST login callback, user = ', user);
    console.log(req.session);
    !user
      ? res
          .status(401)
          .json({status: 'error', code: 'Incorrect credential, bro :('})
      : res.json({
          token: jwt.sign({id: user.id}, process.env.PASSPORT_SECRET_KEY!),
        });
  })(req, res, next);
});

export default router;

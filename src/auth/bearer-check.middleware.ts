import {NextFunction, Request, Response} from 'express';
import passport from 'passport';

const bearerCheck = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('bearer', (err: string, user: Express.User) => {
    if (err) return next(err);

    if (user) {
      req.user = user;
      return next();
    }

    return res.status(401).json({
      message: 'You are not authorized',
    });
  })(req, res, next);
};

export default bearerCheck;

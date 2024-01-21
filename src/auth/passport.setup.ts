import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as BearerStrategy} from 'passport-http-bearer';
import jwt from 'jsonwebtoken';

const users: Express.User[] = [
  // {id: 0, username: 'plohoi@mail.ru', password: 'eto-ne-password'},
  {id: 1, username: 'sasha@mail.ru', password: '123'},
];

passport.serializeUser((user, cb) => {
  console.log('serializeUser', user);
  cb(null, (user as Express.User)?.id);
});

passport.deserializeUser((id, cb) => {
  console.log('deserializeUser', id);
  const user = users.find(u => u.id === id);

  cb(null, user);
});

passport.use(
  new LocalStrategy((username, password, cb) => {
    const user = users.filter(
      u => u.username === username && u.password === password
    );

    return cb(null, user.length === 1 && user[0]);
  })
);

passport.use(
  new BearerStrategy((token, cb) => {
    jwt.verify(token, process.env.PASSPORT_SECRET_KEY!, (err, decoded) => {
      if (err) return cb(err);

      const decodedId = (<Express.User>decoded).id;

      let user = undefined;
      if (decodedId !== undefined) {
        user = users[decodedId - 1];
      }

      return cb(null, user ?? false);
    });
  })
);

export default passport;

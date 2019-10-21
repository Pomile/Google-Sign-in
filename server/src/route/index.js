import express from 'express';
import passport from '../helpers/passport';
import Google from '../controller/Google';
import mockedUser from '../middleware/mockedUser';

const routes = express.Router();

routes.get(
  '/auth',
  (req, res) => {
    res.status(200).json({ status: 200, msg: '/auth is a valid route' }).end();
  },
);

routes.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
);

routes.get(
  '/auth/fake/google',
  mockedUser,
  Google.signIn,
);
routes.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google/failure' }),
  Google.signIn,
);
routes.get(
  '/auth/google/failure',
  (req, res) => {
    res.status(401).json({ status: 401, msg: 'google auth failure' }).end();
  },
);

export default routes;

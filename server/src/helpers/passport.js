import passport from 'passport';
import googlePassport from 'passport-google-oauth';
import dotenv from 'dotenv';
import utils from '../utils/utils';

dotenv.config();
const GoogleStrategy = googlePassport.OAuth2Strategy;

passport.serializeUser((user, done) => done(null, user));

// passport.deserializeUser((user, done) => done(null, user));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_OAUTH_CLIENTID,
  clientSecret: process.env.GOOGLE_OAUTH_SECRET,
  callbackURL: 'http://localhost:8000/api/v1/auth/google/callback',
  profileFields: ['id', 'emails', 'name', 'photos'],
}, utils.strategyCallback));

export default passport;

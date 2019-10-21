import userProfile from '../../spec/moc/mockedprofile';

const utils = {
  strategyCallback: async (accessToken, refreshToken, profile, done) => {
    if (!profile.displayName || !profile.id) {
      return done('No email with this account');
    }
    return done(null, profile);
  },
};

export default utils;

import user from '../../spec/moc/mockedprofile';
import utils from '../utils/utils';

const mockedUser = (req, res, next) => {
  req.user = user;
  utils.strategyCallback(null, null, user, next);
};

export default mockedUser;

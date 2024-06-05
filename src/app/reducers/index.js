import { combineReducers } from 'redux';

import user from './user';
import drivers from './drivers'

export default combineReducers({
  user,
  drivers
});

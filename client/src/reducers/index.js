import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';

// Root reducer
export default combineReducers({
  alert,
  auth,
  profile
});

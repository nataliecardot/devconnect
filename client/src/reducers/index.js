import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

// Root reducer
export default combineReducers({
  alert,
  auth
});

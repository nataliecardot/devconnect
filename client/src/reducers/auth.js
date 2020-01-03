import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED
} from '../actions/types';

const initialState = {
  // All data in Redux store will be cleared to initial state upon client refresh or browser tab close, so setting token this way re-retrieves it from localStorage. If user that logged in returns to site before token expiration time set in expiresIn option routes/api/auth.js, they won't have to log in again (Local storage is data with no expiration date that will persist after the browser window is closed. Session storage is data that gets cleared after the browser window is closed)
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload // Payload contains the user (name, email, avatar, etc., everything but password [see router.get() in routes/api/auth.js])
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // If register is a success, token is received and want user to be logged in right away; this puts token that's returned in local storage
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload, // same as token: '[whatevertokenis]'
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null // To remove user info on logout, etc.
      };
    default:
      return state;
  }
}

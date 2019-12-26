import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from '../actions/types';

const initialState = {
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
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}

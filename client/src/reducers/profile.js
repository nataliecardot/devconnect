import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

const initialState = {
  // On login, a request will be made and all profile data will go in there, and if we visit another user's profile, will go in there
  profile: null,
  // Profile listing page
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    default:
      return state;
  }
}

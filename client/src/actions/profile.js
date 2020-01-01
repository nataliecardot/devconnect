import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get current user's profile
export const getCurrentProfile = () => async dispatch => {
  try {
    // Will know which user to load from token sent from client, which has user id. Route has auth middleware passed in, which adds the id
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data // Route returns profile data corresponding to id (will put this into state)
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update profile
// Want to redirect after form is submitted. History object has a method called push that will redirect to a client-side route
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data // Will be the profile
    });

    dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));

    // If creating a new profile, redirect. Can't use React Router <Redirect /> in a Redux action creator, so using this here, so passing in history object that has push method on it. Have to import withRouter from React Router in CreateProfile component in order to use/pass history object
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

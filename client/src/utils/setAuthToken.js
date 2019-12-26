import axios from 'axios';

// Doing this so can send token with every request to back end instead of picking and choosing what request to send it with
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;

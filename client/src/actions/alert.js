import { SET_ALERT, REMOVE_ALERT } from './types';
const uuidv4 = require('uuid/v4');

// Using dispatch enables dispatching more than one action type from this function. Redux Thunk in use here
// Action setAlert dispatches type of SET_ALERT to reducer, which calls that state in the reducer and causes the state to be returned as specified for that case in the switch statement. The state returned by the reducer is the payload from the action. Initially the state is just an empty array
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4(); // Produces random long string
  // The dispatch will call case in reducer
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  // Dispatches a remove alert action after five seconds. In reducer, this type of action returns alerts that don't match payload id from original set alert action
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

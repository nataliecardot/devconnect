import { SET_ALERT, REMOVE_ALERT } from './types';
const uuidv4 = require('uuid/v4');

// Using dispatch enables dispatching more than one action type from this function. Redux Thunk in use here
// setAlert dispatches actions to reducer, which calls appropriate state in the reducer and causes the state to be returned as specified for that case in the switch statement. The state returned by the reducer is the payload from the action. Initially the state is just an empty array
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4(); // Produces random long string
  // The dispatch will call case in reducer
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  // Dispatches a remove alert action after five seconds. In reducer, this type of action returns alerts that don't match payload id from original set alert action (return state.filter(alert => alert.id !== payload)) -- every alert.id WILL match with the payload in the REMOVE_ALERT action, because it is the exact same ID that was generated to create the alert in the first place when the SET_ALERT action fires
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

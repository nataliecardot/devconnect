import { SET_ALERT, REMOVE_ALERT } from './types';
const uuidv4 = require('uuid/v4');

// setAlert is an action creator.
// A thunk is a function that returns another function. Redux Thunk is in use here, allowing the use of a function in the form (dispatch) => {} in place of an action. So the setAlert action creator returns another function with an argument dispatch,
// Redux Thunk is a middleware (middleware is a piece of code providing a way to interact with actions that have been dispatched to the store before they reach the store's reducer) that lets you call action creators that return a function instead of an action object. That function receives the store’s dispatch method, which is then used to dispatch regular synchronous actions inside the body of the function once the asynchronous operations have completed
// Redux will pass two arguments to thunk functions: dispatch, so that they can dispatch new actions if they need to; and getState, so they can access the current state
// setTimeout milliseconds corresponds to animation duration for class .alert; keep updated
export const setAlert = (msg, alertType, timeout = 4000) => dispatch => {
  const id = uuidv4(); // Produces random long string
  // The dispatch will call case in reducer
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  // Dispatches a remove alert action after five seconds. In reducer, this type of action returns alerts that don't match payload id from original set alert action (return state.filter(alert => alert.id !== payload)) -- every alert.id WILL match with the payload in the REMOVE_ALERT action, because it is the exact same ID that was generated to create the alert in the first place when the SET_ALERT action fires
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

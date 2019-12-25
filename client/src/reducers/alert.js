import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

// Reducers in Redux are responsible for the state modifications that take place in response to actions. A reducer takes state and action as arguments, and always returns a new state

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_ALERT':
      return [...state, payload];
    case 'REMOVE_ALERT':
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}

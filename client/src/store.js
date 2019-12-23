import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // Will be index.js in ./reducers, so can leave off index.js

const initialState = {};

// Redux Thunk is a middleware that lets you call action creators that return a function instead of an object https://alligator.io/redux/redux-thunk/
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

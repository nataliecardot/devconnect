import React, { useEffect } from 'react';
// Selectively imports BrowserRouter, Route and Link from react-router-dom. The as Router statement makes BrowserRouter available under the name Router (instead of BrowserRouter), while the names of Route and Link are not changed
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // Empty array causes it to only run once (tells React the effect doesn't depend on any values from props or state, so it never needs to re-run)
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    // Provider connects React with Redux
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          {/* exact prop needed to prevent all routes starting with "/" to render */}
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
        {/* Every page within theme except landing page has a class of container to center everything */}
      </Router>
    </Provider>
  );
};

export default App;

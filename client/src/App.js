import React, { useEffect } from 'react';
// Selectively imports BrowserRouter, Route and Link from react-router-dom. The as Router statement makes BrowserRouter available under the name Router (instead of BrowserRouter), while the names of Route and Link are not changed
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
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
        {/* exact prop needed to prevent all routes starting with "/" to render */}
        <Route exact path="/" component={Landing} />
        {/* Every page within theme except landing page has a class of container to center everything */}
        <div className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute
              exact
              path="/add-experience"
              component={AddExperience}
            />
            <PrivateRoute
              exact
              path="/add-education"
              component={AddEducation}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;

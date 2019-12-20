import React from 'react';
// Selectively imports BrowserRouter, Route and Link from react-router-dom. The as Router statement makes BrowserRouter available under the name Router (instead of BrowserRouter), while the names of Route and Link are not changed
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/layouts/Landing';
import Navbar from './components/layouts/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => (
  <Router>
    <Navbar />
    {/* exact prop needed to prevent all routes starting with "/" to render */}
    <Route exact path="/" component={Landing} />
    {/* Every page within theme except landing page has a class of container to center everything */}
    <section className="container">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </section>
  </Router>
);

export default App;

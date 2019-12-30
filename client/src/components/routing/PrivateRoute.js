import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// When using this component, it's like a regular route but with a render prop that checks if user is not authenticated and it's not loading, and if so, redirect to login. Else,
// When we pass "component" as an argument to route it has the lower case c, but when we render the component it has to be "Component" to let JSX know that we want to render a component and not an HTML element like "div", so that's why it's component: Component. component comes from the props in the <PrivateRoute> component in app.js
// ...rest is rest parameter. Represents an indefinite number of arguments as an array (anything else passed in). It takes the rest of the props other than destructured props. In this case, the PrivateRoute component had 3 props: exact, path, and component. The component prop is destructured, so ...rest has exact and path props
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  // {...rest}  now will spread the rest of the arguments to Route for example "to" and "exact"
  // Using property render instead of component because we can pass a function to a render, which will allow us to render conditionally based on "isAuthenticated" and "loading"
  <Route
    {...rest}
    render={props =>
      !loading ? (
        !isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      ) : (
        <></> // Not displaying anything because a loading spinner is shown when loading is true and profile is null (per logic in Dashboard component) and don't want to have multiple loading messages/spinners
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // Will pull in all state from auth reducer
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);

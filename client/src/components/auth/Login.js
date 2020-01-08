import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  // using name attribute of input associated with e.target.value. Square brackets around e.target.name: Square brackets in an object are used when you need to use a variable as a key in a key-value pair (otherwise would've needed to write 4 different setState functions). Syntax is called computed propert name
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    // Redirect is from React Router
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="narrow-container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Access your account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Log in" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

// mapStateToProps is used for selecting the part of the data from the store that the connected component needs. This will be called every time the store is updated
// auth is how the auth reducer is named in the root reducer file
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

// connect(mapStateToProps, mapDispatchToProps)
export default connect(mapStateToProps, { login })(Login);

import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';

// Destructuring props so can simply use (e.g.) setAlert rather than props.setAlert (setAlert prop coming from passing it into connect function at bottom [mapDispatchToProps])
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  // using name attribute of input associated with e.target.value. Square brackets around e.target.name: Square brackets in an object are used when you need to use a variable as a key in a key-value pair (otherwise would've needed to write 4 different setState functions). Syntax is called computed propert name
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      // Passes 'Passwords do not match' in as value of action's key 'msg', set the value of key 'alertType' to danger, a random ID will be generated (with uuidv4), and the action will be dispatched with all that info
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        // Can access these because they're being extracted from the component state (the form data)
        name,
        email,
        password
      });
    }
  };

  // Redirect if done registering
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="narrow-container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create your account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            If you want a profile image, use an email associated with a Gravatar
            account
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
      <Alert />
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired, // Using React Snippets extension, ptfr enter
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool // ptb enter
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

// connect() function connects a React component to a Redux store. It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store. Any time you want to have a component interact with Redux, whether calling an action or getting the state, you need to use connect()
// Whenever you bring in an action to use, you have to pass it into connect. Connect takes two things: any state you want to map (a mapStateToProps function) and an object with any actions you want to use (a mapDispatchToProps function)
// mapStateToProps does exactly what its name suggests: connects a part of the Redux state to the props of a React component
// mapDispatchToProps does something similar, but for actions. By doing so, a connected React component will have access to the exact part of the store it needs. mapDispatchToProps connects Redux actions to React props. This way a connected React component will be able to send messages to the store
export default connect(mapStateToProps, { setAlert, register })(Register);

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
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
      console.log('Passwords do not match');
    } else {
      const newUser = {
        name, // Same as name: name (referring to variable above)
        email,
        password
      };

      try {
        // Creating since sending data. To send in request to server
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        // Creates body to send to server as request object body. Converts JavaScript object to JSON string (data sent to a server has to be a string)
        const body = JSON.stringify(newUser);

        const res = await axios.post('/api/users', body, config);
        // Token
        console.log(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required // HTML5 client-side validation (also have server-side validation)
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
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign in</a>
      </p>
    </>
  );
};

export default Register;

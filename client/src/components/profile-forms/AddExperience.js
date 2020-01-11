import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import Alert from '../layout/Alert';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="narrow-container">
      <h1 className="large text-primary">Add Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any
        programming/development-related experience
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          addExperience(formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job title"
            name="title"
            value={title}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text">Example: Boston, MA</small>
        </div>
        <div className="form-group">
          <label htmlFor="from">* From Date</label>
          <input
            type="date"
            name="from"
            id="from"
            value={from}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            name="current"
            id="current"
            checked={current}
            value={current}
            onChange={e => {
              setFormData({ ...formData, current: !current });
              toggleDisabled(!toDateDisabled);
            }}
          />{' '}
          <label htmlFor="current">Current Position</label>
        </div>
        <div className="form-group">
          <label htmlFor="to">To Date</label>
          <input
            type="date"
            name="to"
            id="to"
            value={to}
            onChange={onChange}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job description"
            value={description}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
      <Alert />
    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(withRouter(AddExperience));

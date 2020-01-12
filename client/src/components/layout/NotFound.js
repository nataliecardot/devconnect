import React from 'react';

export const NotFound = () => {
  return (
    <div className="narrow-container">
      <h1 className="x-large text-primary my-3 text-center">
        <i className="fas fa-exclamation-triangle" /> Page Not Found
      </h1>

      <p className="large text-center">
        Sorry, the page you requested does not exist.
      </p>
    </div>
  );
};

export default NotFound;

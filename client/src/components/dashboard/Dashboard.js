// Will fetch all data with an action, bring it in with a Redux state, and then pass it down to other components (such as experience and education components)
import React, { useEffect } from 'react'; // rafcp enter: Arrow function component with propTypes
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Alert from '../layout/Alert';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome, {user && user.name}!
      </p>
      {profile ? (
        <>
          <DashboardActions />
          <Alert />
          {profile.experience.length > 0 && (
            <Experience experience={profile.experience} />
          )}
          {profile.education.length > 0 && (
            <Education education={profile.education} />
          )}

          <div className="my-2">
            <button
              className="btn btn-danger delete-account-btn"
              onClick={deleteAccount}
            >
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You haven't added any profile information.</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // Reminder: auth and profile as named in root reducer
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);

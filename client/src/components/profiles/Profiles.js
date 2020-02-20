import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from './Pagination';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(7);

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // First/last profile index not on the page but to use in the slice method
  // For first page, would be 1 x 10 = 10; for second page, 2 x 10 = 20
  const indexOfLastProfile = currentPage * profilesPerPage;
  // For first page, would be 10 - 10 = 0; for second page, 20 - 10 = 10
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  // Slice method returns new array, selecting elements starting at the given start argument, up until (but excluding) the given end argument
  const currentProfiles = profiles.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  return (
    <>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop" /> Browse and connect with
        developers
      </p>
      <div className="profiles">
        {currentProfiles.length ? (
          <>
            {currentProfiles.map(profile => (
              <ProfileItem key={profile._id} profile={profile} />
            ))}
            <Pagination
              profilesPerPage={profilesPerPage}
              totalProfiles={profiles.length}
              paginate={paginate}
            />
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);

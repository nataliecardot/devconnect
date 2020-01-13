import React from 'react';
import PropTypes from 'prop-types';
const uuidv4 = require('uuid/v4');

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => (
  <div className="profile-about bg-light p-2">
    {bio && (
      <>
        <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
        <p>{bio}</p>
        <div className="line"></div>
      </>
    )}

    <h2 className="text-primary">Skill Set</h2>
    <div className="skills">
      {skills.map(skill =>
        // Conditional prevents display of checkmark with nothing next to it if, say, user ends skills list with a comma (in which case the skill would be an empty string)
        skill ? (
          <div key={uuidv4()} className="p-1">
            <i className="fas fa-check" /> {skill}
          </div>
        ) : null
      )}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;

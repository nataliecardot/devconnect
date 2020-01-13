import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const uuidv4 = require('uuid/v4');

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map(skill =>
          // Conditional prevents display of checkmark with nothing next to it if, say, user ends skills list with a comma (in which case the skill would be an empty string)
          skill ? (
            <li key={uuidv4()} className="text-primary">
              <i className="fas fa-check" /> {skill}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to="profile">
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="MM-DD-YYYY">{date}</Moment>
      </p>
      <button type="button" className="btn btn-light">
        <i
          className="fas fa-thumbs-up"
          style={{ paddingRight: likes.length > 0 ? '0.25rem' : null }}
        />
        {likes.length > 0 && <span>{likes.length}</span>}
      </button>
      <button type="button" className="btn btn-light">
        <i className="fas fa-thumbs-down" />
      </button>
      <Link to={`/post/${_id}`} className="btn btn-primary">
        Discussion{' '}
        {comments.length > 0 && (
          <span className="comment-count">{comments.length}</span>
        )}
      </Link>
      {!auth.loading && user === auth.user._id && (
        <button type="button" className="btn btn-danger">
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  </div>
);

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(PostItem);

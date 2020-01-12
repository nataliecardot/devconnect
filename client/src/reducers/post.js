import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_COMMENT,
  DELETE_COMMENT
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        // Using spread syntax to fill in post state (object expression to be expanded in places where zero or more key-value pairs [for object literals] are expected)
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        // Only need to manipulate post since it will be on single post page. Payload is an array of comments for the post
        post: { ...state.post, comments: payload },
        loading: false
      };
    case DELETE_COMMENT:
      return {
        ...state,
        // The payload is the comment ID
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}

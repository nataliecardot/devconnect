const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    // Connecting it with an id in the user model. id is not in the User model file, but when a new user is created, refers to _id that is added
    type: Schema.Types.ObjectId,
    // The ref option tells Mongoose which model to use during population, because every post should be associated with a user -- ref name is the same one being exported from the user model, i.e., mongoose.model('User', userSchema)
    // Note: MongoDB automatically makes the models plural when entries start pouring in; user becomes users. When you call mongoose.model() on a schema, Mongoose compiles a model for you.The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  // Name of user, not post
  name: String, // String is shorthand for { type: String }
  avatar: String,
  likes: [
    {
      // So know which likes came from which user. Will make it so a user can only like a post once
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      text: {
        type: String,
        required: true
      },
      name: String,
      avatar: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);

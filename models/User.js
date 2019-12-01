const mongoose = require('mongoose');

// To interact with database, have to create a Mongoose model for each of the resources. To create a model, have to create a schema, which holds the different fields this particular resource should have

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // Will have user log in with email and password, rather than having separate field for username
  email: {
    type: String,
    required: true,
    // Prevent multiple sign ups with same email
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Gravatar. Adding to user model so it's always accessible. When you first register, it will create a user but not a profile right away. But want avatar available right away
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Models are fancy constructors compiled from Schema definitions. Schema are the description of the data. Model kind of represent your collection. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database. To interact with database, have to create a Mongoose model for each of the resources. To create a model, have to create a schema, which holds the different fields this particular resource should have

const userSchema = new Schema({
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
  avatar: String, // String is shorthand for { type: String }
  date: {
    type: Date,
    default: Date.now
  }
});

// Don't have to name the export per https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose (originally was module.exports = User = mongoose.model('User', userSchema);)
module.exports = mongoose.model('User', userSchema);

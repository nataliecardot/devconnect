const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Will bring this into profile routes and query the database (get profiles, create them, update, delete, etc.)
const profileSchema = new Schema({
  user: {
    // Connecting it with an id in the user model. id is not in the User model file, but when a new user is created, refers to _id that is added
    // In the registration route in api/users.js, with the line await user.save() after creating an instance of the User model with user = new User({ ..... }), MongoDB creates a document within the collection called users, and for each of these documents, an _id field is automatically created. The JWT token payload (data sent in token) is set to a user key with a value id: user.id, short for user._id, with ._id being the id created by MongoDB for the document)
    type: Schema.Types.ObjectId,
    // The ref option tells Mongoose which model to use during population, because every profile should be associated with a user -- ref name is the same one being exported from the user model, i.e., mongoose.model('User', userSchema)
    // Note: MongoDB automatically makes the models plural when entries start pouring in; user becomes users. When you call mongoose.model() on a schema, Mongoose compiles a model for you.The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name
    ref: 'User'
  },
  company: String,
  website: String,
  location: String,
  // e.g., developer, senior developer, student, instructor (there will be a dropdown with options)
  status: {
    type: String,
    required: true
  },
  skills: {
    // An array of strings
    type: [String],
    required: true
  },
  bio: String, // String is shorthand for { type: String }
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', profileSchema);

const mongoose = require('mongoose');

// Will bring this into profile routes and query the database (get profiles, create them, update, delete, etc.)
const ProfileSchema = new mongoose.Schema({
  // Create reference to user model, because every profile model should be associated with user
  user: {
    // Connecting it with an ID in the user model. id is not in the User model file, but when a new user is created, refers to _id that is added
    type: mongoose.Schema.Types.ObjectId,
    // The ref option tells Mongoose which model to use during population, because every profile should be associated with a user -- ref name is the same one being exported from the user model, i.e., mongoose.model('User', userSchema)
    // Note: MongoDB automatically makes the models plural when entries start pouring in; user becomes users
    ref: 'User'
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
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
  bio: {
    type: String
  },
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

module.exports = Profile = mongoose.model('Profile', ProfileSchema);

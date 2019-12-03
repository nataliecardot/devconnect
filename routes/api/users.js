const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// Bring in Mongoose model
// A Mongoose model is a wrapper on the Mongoose schema. A Mongoose schema defines the structure of the document, default values, validators, etc., whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.
const User = require('../../models/User');

// @route POST api/users (JSDoc comment style)
// @desc Register user
// @access Public (don't need to send authentication token for it to work)
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // Sets response in the case of validation errors
    if (!errors.isEmpty()) {
      // Returns bad request code and array of validation error messages
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check whether user exists
      let user = await User.findOne({ email });

      if (user) {
        // Matching same type of error response in req.body if there are errors, an array of errors. Doing it this way so that on the client, we get same type of error whether it's one of the input errors from request body or the user already exists
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get user's gravatar (based on email)
      const avatar = gravatar.url(email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Gives default icon if no Gravatar image found
      });

      // Doesn't save the user, just creates a new instance -- have to do user.save() in order to save to database
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt password with bcryptjs

      // A salt is random text added to the string to be hashed
      // 10 is the number of rounds the data is processed for, and is the number suggested in the docs. The higher the number, the more secure but also takes more processing time
      const salt = await bcrypt.genSalt(10);

      // Sets password to hashed (scrambled) version
      user.password = await bcrypt.hash(password, salt);

      // Save user to database
      await user.save();

      // Return jsonwebtoken so that when a user registers they're logged in right away

      res.send('User registered');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

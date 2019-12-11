const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route GET api/auth (JSDoc comment style)
// @desc Test route
// @access Public (don't need to send authentication token for it to work)
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Enable log in – can get token back at point of registration, now want to take credentials (email, pass), send to route, and get token

// @route POST api/auth
// @desc Authenticate (log in) user and get token
// @access Public (don't need to send authentication token for it to work)
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // Sets response in the case of validation errors
    if (!errors.isEmpty()) {
      // Returns bad request code and array of validation error messages
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check whether user exists
      let user = await User.findOne({ email });

      if (!user) {
        // Matching same type of error response in req.body if there are errors, an array of errors. Doing it this way so that on the client, we get same type of error whether it's one of the input errors from request body or the user already exists
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // Bcrypt has a method called compare that takes a plain text password and an encrypted password and compares them and tells you if it's a match or not
      // Takes password destructured from req body above and encrypted password from user, because made request to database to get the user with Mongoose query findOne(), and if the user is present, the password is stored in the query object returned (stored in user variable)
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      // TODO: Change expiresIn option to 3600 (seconds - one hour) once it's ready for production
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          // If there's an error, the error is thrown (generated), and execution of the current function will stop (the statements after throw won't be executed)
          if (err) throw err;
          // Send token back to client
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

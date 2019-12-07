const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/profile/me
// @desc Get logged in user's profile
// @access Private (getting profile by the user ID in the token, so a token must be provided)
router.get('/me', auth, async (req, res) => {
  try {
    // User pertains to profile model user field, which is object ID of user
    // populate method, which lets you reference documents in other collections, adds name and avatar to query from User model
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('User', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    // The message property is a human-readable description of the error
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

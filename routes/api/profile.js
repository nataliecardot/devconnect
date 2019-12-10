const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

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
      // Bringing in (populating) fields from User model
    }).populate('user', ['name', 'avatar']);

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

// @route POST api/profile/me
// @desc Create or update a user profile
// @access Private (getting profile by the user ID in the token, so a token must be provided)
// Using both auth and Express validater (check) middleware
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};
    // User ID is from token that was sent
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object that receives the incoming youtube, twitter, etc., strings that were destructured from the req.body object (if they exist)

    // If don't initialize this first, will get an error saying it's undefined
    // Note in the Profile model, the social object contains field:value pairs. The fields are youtube, twitter, facebook, linkedin, instagram, and the values of these fields are set as type string
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.youtube = youtube;

    try {
      // user field is object ID, coming from req.user.id, which comes from the token
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          // The default is to return the original, unaltered document. If you want the new, updated document to be returned, you have to pass an additional argument: an object with the new property set to true
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      // Calling on instance created from model, not Profile model itself
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route GET api/profile
// @desc Get all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/profile/user/:user_id (:user_id is placeholder)
// @desc Get profile by user ID
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    // ObjectId is coming from Mongoose. It refers to the object id which is unique for every document in the database
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route DELETE api/profile
// @desc Delete profile, user, and posts
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    // TODO: Remove user's posts
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove the user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

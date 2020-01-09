const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

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
    company
      ? (profileFields.company = company)
      : (profileFields.company = null);
    website
      ? (profileFields.website = website)
      : (profileFields.website = null);
    location
      ? (profileFields.location = location)
      : (profileFields.location = null);
    bio ? (profileFields.bio = bio) : (profileFields.bio = null);
    status ? (profileFields.status = status) : (profileFields.status = null);
    githubusername
      ? (profileFields.githubusername = githubusername)
      : (profileFields.githubusername = null);
    skills
      ? (profileFields.skills = skills.split(',').map(skill => skill.trim()))
      : (profileFields.skills = null);

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

    // If you remove this line and you search for a user id which doesn't exist, you will get a response with status 200 (OK) and body with null. By default, mongoose findOne will not throw an exception if  the query result is 0
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
    // Remove user's post(s)
    await Post.deleteMany({ user: req.user.id });

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

// @route PUT api/experience
// @desc Add experience to profile
// @access Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
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
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    // Creates object with data user submits.
    const newExp = {
      title, // Same as title: title, with the value being the one destructured from req.body
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      // Where the user field has a value matching the id (in payload) from the token sent in req object
      const profile = await Profile.findOne({ user: req.user.id });

      // Add new experience data to beginning of experience array
      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Could be a put request since updating (overwriting), but making it a delete request since something is being removed (matter of preference)
// @route DELETE api/profile/experience/:exp_id
// @desc Delete experience from profile
// @access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index (get correct experience to remove)
    // Mapping over experience array (an array of objects), creating an array of _id properties, then taking that array and returning the index of the item in the array matching the experience id passed in as a part of the query string request paramater
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    // Start position to remove items (note you can also add items with splice), and delete count (if omitted, all elements from start position to end of array would be deleted)
    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route PUT api/education
// @desc Add education to profile
// @access Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
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
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    // Creates object with data user submits.
    const newEdu = {
      school, // Same as school: school, with the value being the one destructured from req.body
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      // Where the user field has a value matching the id (in payload) from the token sent in req object
      const profile = await Profile.findOne({ user: req.user.id });

      // Add new education data to beginning of education array
      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Could be a put request since updating (overwriting), but making it a delete request since something is being removed (matter of preference)
// @route DELETE api/profile/education/:edu_id
// @desc Delete education from profile
// @access Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index (get correct education to remove)
    // Mapping over education array (an array of objects), creating an array of _id properties, then taking that array and returning the index of the item in the array matching the education id passed in as a part of the query string request paramater
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    // Start position to remove items (note you can also add items with splice), and delete count (if omitted, all elements from start position to end of array would be deleted)
    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/profile/github/:username
// @desc Get user's repos from GitHub
// @access Public (anyone can view a GitHub profile)
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubClientSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No GitHub profile found ' });
      }

      // JSON.parse() takes string written in JSON format and returns a JavaScript object
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

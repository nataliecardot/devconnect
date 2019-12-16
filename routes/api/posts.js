const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route POST api/posts
// @desc Create a post
// @access Private
router.post(
  '/',
  [
    auth,
    [
      // There will also be name and avatar associated with post, but will be making a request with user ID from token to get it, so it will not be sent in this request
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Doing this so can get name, avatar (name and avatar are fetched from database using id from token [i.e., from the matching document in the users collection]), and user itself
      // Logged in, so have token, which provides user id and puts in req.user.id
      const user = await User.findById(req.user.id).select('-password');

      // Instantiate (create instance of) new post from model
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();

      // Once post is added, it will be returned as JSON in the response
      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

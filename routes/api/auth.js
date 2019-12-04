const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// @route GET api/auth (JSDoc comment style)
// @desc Test route
// @access Public (don't need to send authentication token for it to work)
router.get('/', auth, (req, res) => res.send('Auth route'));

module.exports = router;

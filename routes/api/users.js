const express = require('express');
const router = express.Router();

// @route GET api/users (JSDoc comment style)
// @desc Test route
// @access Public (don't need to send authentication token for it to work)
router.get('/', (req, res) => res.send('User route'));

module.exports = router;

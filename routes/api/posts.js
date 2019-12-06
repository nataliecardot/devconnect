const express = require('express');
const router = express.Router();

// @route GET api/posts (JSDoc comment style)
// @desc Test route
// @access Public (don't need to send authentication token for it to work)
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;
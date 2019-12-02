const express = require('express');
const router = express.Router();

// @route POST api/users (JSDoc comment style)
// @desc Register user
// @access Public (don't need to send authentication token for it to work)
router.post('/', (req, res) => {
  console.log(req.body);
  res.send('User route');
});

module.exports = router;

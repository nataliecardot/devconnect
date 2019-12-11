const jwt = require('jsonwebtoken');
const config = require('config');

// This is middleware for verifying JSON web token that comes in from the client (header)
// When a request is sent to a protected route, need to send the token within a header to authenticate and enable access to it
// Exporting a middleware function (a function that has request and response objects available to it)
module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    // 401: unathorized
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    // Decode the token
    // To verify an incoming JWT, a signature is generated using the header and payload from the incoming JWT (as was done to create the JWT), and the secret key. If the signature matches the one on the JWT, then the JWT is considered valid. If you’re a hacker trying to issue a fake token, you can easily generate the header and payload, but without knowing the key, there is no way to generate a valid signature (the signature is made up of a hash of the header, payload, and secret)
    // Note: The jwt.decode method only decodes the token and should only every be used on trusted messages. Since jwt.verify also decodes the token but after verification, it provides a safer and more secure way to decode the token, so it should be the preferred method
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Take request object and assign a value to user (decoded has user in the payload). Then can use this req.user (which contains the user ID) in any of the protected routes and, for instance, get the user's profile
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

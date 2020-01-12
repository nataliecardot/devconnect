const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect database
connectDB();

// Used to have to install Body Parser as sep package and require it in then initialize it (`app.use(bodyParser.json())`), but now included with Express (since v. 4.16.0, released Oct. 2017). express.json() is based on body-parser and parses incoming requests with JSON payloads (the payload is the part of transmitted data that is the actual intended message. Headers and metadata are sent only to enable payload delivery). Parsing meaning converting from a JSON string representation (when sending data to a web server, the data has to be a string, and in this case the string would follow the JSON specification https://www.quora.com/What-does-parsing-JSON-mean), recognizing the incoming request object as a JSON object
// This binds the express.json() middleware to an instance of the app object. Allows getting data from req.body of POST request
app.use(express.json());

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder (want to set index.html in client/build to be static file)
  app.use(express.static('client/build'));

  // Serve the index.html file
  // Route to anything aside from the API routes specified above
  app.get('*', (req, res) => {
    // path.resolve joins a series of string paths
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));

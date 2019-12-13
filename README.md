# devconnect

A social network for developers, built on the MERN stack.

### Quick Start

To run locally, you will need to create a cluster with MongoDB Atlas and connect to it. Using the connection string, insert into the file `defaultSAMPLE.js` and remove "SAMPLE" from the file name.

### Notes

- `express-validator`: for data validation – when making request to API, will raise an error if specified fields are missing

- `bcryptjs`: for password encyption

- `config`: for creating global variables for use throughout application. The default values are stored in `default.json` (in the `config` folder)

- `gravatar`: for profile avatars. When registering, user can use the email associated with their Gravatar account and it will automatically show their profile image

- `jsonwebtoken`: needed because using JWT to pass along a token for validation

- `mongoose`: object data modeling library – a JavaScript layer that sits on top of database, acting as an intermediary between MongoDB and a server-side language (in this case Node.js/Express). Connecting to MongoDB using Mongoose is done in the file `db.js` in the `config` folder

- `request`: enables making HTTP requests to another API. Using this to display GitGub repositories on profile, making request from back end to hide API key, etc., and only return repositories

- `nodemon`: monitors for file changes and automatically restarts server when there's a change

- `concurrently`: used to run a Node server and a React front-end development server at the same time

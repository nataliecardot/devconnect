# devconnect

A social network for developers, built on the MERN stack.

### Quick Start

To run locally, you will need to create a cluster with MongoDB Atlas and connect to it. Using the connection string, insert into the file `config/defaultSAMPLE.js` and remove "SAMPLE" from the file name.

```bash
# Install dependencies (will also need to install dependencies from
# within client directory, the front end)
npm install

# Run Node server with Nodemon and start React development server from
# client folder (runs both front and back end, Node on localhost:5000
# and React on localhost:3000)
npm run dev
```

### Notes

- `express-validator`: for data validation – when making request to API, will raise an error if specified fields are missing

- `bcryptjs`: for password encyption

- `config`: for creating global variables for use throughout application. The default values are stored in `default.json` (in the `config` folder)

- `gravatar`: for profile avatars. When registering, user can use the email associated with their Gravatar account and it will automatically show their profile image

- `jsonwebtoken`: needed because using JWT to pass along a token for validation

- `mongoose`: object data modeling library – a JavaScript layer that sits on top of database, acting as an intermediary between MongoDB and a server-side language (in this case Node.js/Express). Connecting to MongoDB using Mongoose is done in the file `db.js` in the `config` folder

- `request`: enables making HTTP requests to another API. Using this to display GitGub repositories on profile, making request from back end to hide API key, etc., and only return repositories

- `nodemon`: monitors for file changes and automatically restarts server when there's a change

- `concurrently`: used to run a Node server and a React front-end development server at the same time (with `npm run dev`)

- `redux-thunk`: allows the making of asynchronous requests in Redux actions

- `moment`: JavaScript library for working with dates and times (e.g., formatting)

- `uuid`: generates a random string, for use as an id in this app

_Front end:_

The app's front end is contained in the `client` directory. It was bootstrapped with `create-react-app`.

Requests to the back end are handled with [`axios`](https://www.npmjs.com/package/axios), a promise-based HTTP client.

Create React App runs the app on its own development server, so the front and back end could not be served on the same server and port as is commonly practiced for full-stack apps. To eliminate the need for rerouting requests to the back-end server and setting CORS headers, proxying is used – the `package.json` file in the front end directory contains a `proxy` field that proxies non-text/html requests to the back-end server. (In other words, it tells React to forward all API requests to the Express server.) `create-react-app` automatically sets the request origin to the value of the `proxy` field in `client/package.json` while in development mode, but resets it to whatever it is being served as in production mode. This allows for more succinct axios requests, for instance, with `axios.get('/api/profile')` rather than `axios.get('http://localhost:5000/api/profile)`), because the development server will recognize `'/api/profile'` is not a static asset (given it will only attempt to send requests without text/html in its Accept header to the proxy) and will proxy the request to http://localhost:5000/api/profile as a fallback.

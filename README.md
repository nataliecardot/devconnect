# devconnect

A social network for developers, built on the MERN stack.

### Dependencies

- `express-validator`: for data validation -- when making request to api, will raise an error if fields are missing

- `bcryptjs`: for password encyption

- `config`: for global variables

- `gravatar`: for profile avatars. If a user signs up they can use email associated with gravatar account and will automatically show profile image

- `jsonwebtoken`: needed because using JWT to pass along a token for validation

- `mongoose`: object data modeling library -- a JavaScript layer that sits on top of database, acting as an intermediary between MongoDB and a server-side language (in this case Node.js/Express)

- `request`: enables making HTTP requests to another API using this to display github repositories on profile, making request from back end so we can hide api key, etc., and only return repositories

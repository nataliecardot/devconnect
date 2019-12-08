const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// Using asynchronous arrow function because need something to call in server.js
//  async function declaration defines an asynchronous function, which returns an AsyncFunction object. An asynchronous function is a function which operates asynchronously via the event loop, using an implicit Promise to return its result
const connectDB = async () => {
  try {
    // mongoose.connect() returns a promise
    await mongoose.connect(db, {
      // Options to use new URL string parser and new Server Discovery and Monitoring engine. This addresses DeprecationWarning messages that are thrown
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.mesage);
    // Exit process with failure. https://nodejs.org/api/process.html#process_process_exit_code
    process.exit(1);
  }
};

module.exports = connectDB;

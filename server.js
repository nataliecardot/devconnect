const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect database
connectDB();

app.get('/', (req, res) => res.send('API running'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));

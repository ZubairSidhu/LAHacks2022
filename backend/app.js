/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

app.use(
  express.urlencoded({ extended: true }),
  express.json(),
  cors({
    origin: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
    credentials: true,
  }),
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

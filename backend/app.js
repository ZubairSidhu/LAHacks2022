/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Routers
const userRouter = require('./routes/user');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

// Connecting to mongo
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoConnection = mongoose.connection;
mongoConnection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use(
  express.urlencoded({ extended: true }),
  express.json(),
  cors({
    origin: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
    credentials: true,
  }),
);

app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

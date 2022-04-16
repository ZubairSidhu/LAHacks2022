const express = require('express');
const User = require('../models/user.model');

const userRouter = express();
userRouter.use(express.json());

userRouter.get('/', async (req, res) => {
  try {
    User.find({}, (err, users) => {
      if (err) {
        // console.log(err);
        res.status(400).json({ error: 'Error fetching users' });
      } else {
        // console.log('Users: ');
        // console.log(users);
        res.json(users);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    User.find({ email }, (err, users) => {
      if (err) {
        // console.log(err);
        res.status(400).json({ error: 'Error fetching users' });
      } else {
        // console.log('Users: ');
        // console.log(users);
        res.json(users);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, zip, email, password, phone, wallet } = req.body;
    const obj = { firstName, lastName, zip, email, password, phone, wallet };
    res.status(200).send({
      obj,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

userRouter.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    User.find({ email }, (err, users) => {
      if (err) {
        // console.log(err);
        res.status(400).json({ error: 'Error fetching users' });
      } else if (users.length > 0 && users[0].password === password) {
        res.status(200).send(users[0]);
      } else {
        res.status(400).send('Invalid password');
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = userRouter;

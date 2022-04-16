const express = require('express');
const User = require('../models/user.model');

const userRouter = express();
userRouter.use(express.json());

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

module.exports = userRouter;

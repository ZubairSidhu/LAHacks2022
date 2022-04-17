const express = require('express');
const User = require('../models/user.model');

const userRouter = express();
userRouter.use(express.json());

// Get all users
userRouter.get('/', async (req, res) => {
  try {
    User.find({}, (err, users) => {
      if (err) {
        res.status(400).json({ error: 'Error fetching users' });
      } else {
        res.json(users);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get user by email
userRouter.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    User.findOne({ email }, (err, user) => {
      if (err) {
        res.status(400).json({ error: 'Error fetching users' });
      } else {
        res.json(user); // Returns null if not found
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// User sign up
// TODO: Make sure there's no duplicate emails
userRouter.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, zip, email, password, wallet } = req.body;

    User.findOne({ email }, (err, user) => {
      if (err) {
        res.status(400).json({ error: 'Error fetching users' });
      } else if (user) {
        res.status(400).json('Email Already Exists');
      } else {
        const obj = {
          firstName,
          lastName,
          zip,
          email,
          password,
          wallet,
          preferences: [],
          oneWayMatch: [],
          twoWayMatch: [],
          trackedWorkouts: [],
        };

        User.create(obj, (e, u) => {
          if (e) {
            res.status(400).json({ e: 'Error creating user' });
          } else {
            res.status(200).json(u);
          }
        });
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// User sign in
userRouter.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err) {
        res.status(400).json({ error: 'Error fetching users' });
      } else if (user && user.password === password) {
        res.status(200).send(user);
      } else {
        res.status(400).send('Invalid password');
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update user info
userRouter.put('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const {
      firstName,
      lastName,
      zip,
      phone,
      wallet,
      preferences,
      oneWayMatch,
      twoWayMatch,
      trackedWorkouts,
    } = req.body;
    User.findOneAndUpdate(
      { email },
      {
        firstName,
        lastName,
        zip,
        phone,
        wallet,
        preferences,
        oneWayMatch,
        twoWayMatch,
        trackedWorkouts,
      },
      { new: true },
      (err, user) => {
        if (err) {
          res.status(400).json({ error: 'Error updating user' });
        } else {
          res.json(user);
        }
      },
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete user
userRouter.delete('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    User.findOneAndDelete({ email }, (err, user) => {
      if (err) {
        res.status(400).json({ error: 'Error deleting user' });
      } else {
        res.json(user);
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = userRouter;

const util = require('util');
const express = require('express');
const axios = require('axios');
const Fuse = require('fuse.js');
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
userRouter.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, zip, email, password, age, bio, activityLevel } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json('Email Already Exists');
      return;
    }

    const searchParams = {
      api_key: process.env.PDL_KEY,
      first_name: firstName,
      last_name: lastName,
      email,
      postal_code: zip,
    };

    const { data: response } = await axios.get('https://api.peopledatalabs.com/v5/person/enrich', {
      params: searchParams,
    });

    // res.status(200).send(response);
    console.log(util.inspect(response));

    const experience = response?.data.experience.map((exp) => ({
      company: exp.company.name,
      title: exp.title.name,
      endDate: exp.end_date,
    }));

    const education = response?.data.education.map((ed) => ({
      name: ed.school.name,
      endDate: ed.end_date,
    }));

    const userData = {
      firstName,
      lastName,
      zip,
      email,
      password,
      age,
      bio,
      activityLevel,
      preferences: {},
      oneWayMatch: [],
      twoWayMatch: [],
      trackedWorkouts: [],
      experience,
      education,
      linkedInID: response?.data.linkedin_id,
      location: response?.data.location_metro,
    };

    console.log(userData);

    const newUser = await User.create(userData);
    res.status(200).json(newUser);
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

userRouter.post('/potential-matches/', async (req, res) => {
  try {
    const { preferences, searcherId } = req.body;
    console.log(preferences);

    const filter = { _id: { $ne: searcherId } };
    if (preferences.minAge || preferences.maxAge) {
      filter.age = {
        $gte: preferences.minAge || 0,
        $lte: preferences.maxAge || 100,
      };
    }
    if (preferences.minActivityLevel || preferences.maxActivityLevel) {
      filter.activityLevel = {
        $gte: preferences.minActivityLevel || 0,
        $lte: preferences.maxActivityLevel || 5,
      };
    }

    console.log(filter);
    User.find(filter, (err, users) => {
      if (err) {
        res.status(400).json({ error: 'Error fetching users' });
      } else {
        console.log(users);
        const titleResults =
          preferences.title == null
            ? []
            : new Fuse(users, {
                includeMatches: true,
                isCaseSensitive: false,
                keys: ['experience.title'],
              }).search(preferences.title);
        const companyResults =
          preferences.company == null
            ? []
            : new Fuse(titleResults, {
                isCaseSensitive: false,
                includeMatches: true,
                keys: ['item.experience.company'],
              }).search(preferences.company);
        // IN CASE IT BREAKS LATER: SEE WHAT HAPPENS WITH ITEM AND MULTIPLE RESULTS FROM TITLERESULTS
        // console.log(titleResults);
        // console.log(companyResults);
        res.json(
          preferences.title == null && preferences.company == null ? users : companyResults,
          // : [...new Set([...titleResults, ...companyResults])],
        );
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

userRouter.post('/swipe', async (req, res) => {
  try {
    const { swiperId, swipeeId } = req.body;
    // Check for 2 way match
    const swipee = await User.findById(swipeeId);
    if (swipee.one_way_match.includes(swiperId)) {
      // Remove swiper from swipee one_way_match
      await User.findByIdAndUpdate(swipeeId, { $pull: { one_way_match: swiperId } });
      // Add to both users two_way_match
      await User.findByIdAndUpdate(swiperId, { $push: { two_way_match: swipeeId } });
      await User.findByIdAndUpdate(swipeeId, { $push: { two_way_match: swiperId } });
      res.status(200).json({ match: true });
    } else {
      // Not a two way match
      // Add swipee to swipers one_way_match
      await User.findByIdAndUpdate(swiperId, { $push: { one_way_match: swipeeId } });
      res.status(200).json({ match: false });
    }
    return;
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update user info
userRouter.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      firstName,
      lastName,
      zip,
      password,
      age,
      bio,
      activityLevel,
      preferences,
      oneWayMatch,
      twoWayMatch,
      trackedWorkouts,
    } = req.body;
    User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        zip,
        password,
        age,
        bio,
        activityLevel,
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
userRouter.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    User.findByIdAndUpdate(userId, (err, user) => {
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

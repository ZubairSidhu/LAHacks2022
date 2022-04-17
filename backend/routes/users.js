const util = require('util');
const express = require('express');
const axios = require('axios');
const Fuse = require('fuse.js');
const ethers = require('ethers');
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
    const {
      firstName,
      lastName,
      zip,
      email,
      password,
      age,
      bio,
      activityLevel,
      wallet,
      transaction,
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json('Email Already Exists');
      return;
    }

    console.log(wallet, transaction);

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
      wallet,
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
    // console.log(preferences);

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

    // console.log(filter);
    User.find(filter, (err, users) => {
      if (err) {
        res.status(400).json({ error: 'Error fetching users' });
      } else {
        // console.log(users);
        const titleResults =
          preferences.title == null
            ? []
            : new Fuse(users, {
                includeMatches: true,
                isCaseSensitive: false,
                keys: ['experience.title'],
              })
                .search(preferences.title)
                .map((result) => result.item);
        const companyResults =
          preferences.company == null
            ? []
            : new Fuse(users, {
                isCaseSensitive: false,
                includeMatches: true,
                keys: ['experience.company'],
              })
                .search(preferences.company)
                .map((result) => result.item);
        res.json(
          preferences.title == null && preferences.company == null
            ? users
            : (preferences.title == null ? users : titleResults).filter((user) =>
                (preferences.company == null ? users : companyResults).includes(user),
              ),
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
    User.deleteOne({ _id: userId }, (err, user) => {
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

const CONTRACT_ADDR = '0x024d84a6a9830df1c4a518e5943d8b2E90e6d12c';
const CONTRACT_ABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    inputs: [],
    name: 'YEARLY_SUBSCRIPTION_PRICE',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_currentYear', type: 'uint256' },
      { internalType: 'address', name: '_receiver', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
    ],
    name: 'payOut',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_year', type: 'uint256' }],
    name: 'subscribe',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'subscriptions',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
];

// Payout
userRouter.post('/payout/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // do stuff like store the exercise, check the other user match, etc.

    const selfUser = await User.findById(userId);
    const receiver = selfUser.wallet;
    // const { friend, etc } = req.body;
    const provider = new ethers.providers.JsonRpcProvider(
      // 'https://rpc.ankr.com/avalanche_fuji-c',
      'https://api.avax-test.network/ext/bc/C/rpc',
      43113,
    );
    const wallet = new ethers.Wallet(process.env.ETH_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDR, CONTRACT_ABI, provider);

    const overrides = {
      gasLimit: ethers.utils.hexlify(100000),
    };
    // MAYBE: Increment year because contract reverts if you resubscribe for same year
    const unsignedTx = await contract.populateTransaction.payOut(
      new Date().getFullYear(),
      receiver,
      ethers.utils.parseEther('0.01'),
      overrides,
    );
    const trans = await wallet.sendTransaction(unsignedTx);
    res.status(200).send(trans.hash);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = userRouter;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  zip: { type: String, required: true },
  email: { type: String, required: true }, // aka username
  password: { type: String, required: true },
  wallet: { type: String, required: false }, // crypto wallet
  preferences: { type: Array, required: true },
  one_way_match: { type: Array, required: false },
  two_way_match: { type: Array, required: false },
  tracked_workouts: { type: Array, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

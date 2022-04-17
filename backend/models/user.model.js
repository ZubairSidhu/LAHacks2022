const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // User entered
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: false },
  zip: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  wallet: { type: String, required: false }, // crypto wallet
  bio: { type: String, required: false },
  activityLevel: { type: Number, required: false },
  preferences: { type: Object, required: true },
  // Internal
  one_way_match: { type: Array, required: false },
  two_way_match: { type: Array, required: false },
  tracked_workouts: { type: Array, required: true },
  // Implied using People Data lab
  experience: { type: Array, required: false },
  education: { type: Array, required: false },
  linkedInID: { type: String, required: false },
  location: { type: String, required: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

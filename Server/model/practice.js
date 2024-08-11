const mongoose = require('mongoose');

// Define the schema
const practiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const User = mongoose.model('User', practiceSchema);

module.exports = User;

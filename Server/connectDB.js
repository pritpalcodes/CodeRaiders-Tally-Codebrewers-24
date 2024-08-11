const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODBURI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

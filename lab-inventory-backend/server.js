const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const app = require('./app');
const port = process.env.PORT || 5000;

app.use(express.json());
// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

app.listen(port, '0.0.0.0',() => {
  console.log(`Server is running on port: ${port}`);
});

// To run on IPv6
// app.listen(port, '::',() => {
//   console.log(`Server is running on port: ${port}`);
// });
const mongoose = require('mongoose');

const userTypeSchema = new mongoose.Schema({
    type: { type: String, required: true }
  });
  
module.exports = mongoose.model('UserType', userTypeSchema);
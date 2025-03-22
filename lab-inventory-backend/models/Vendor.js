const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, default: '' }
  });
  
module.exports = mongoose.model('Vendor', vendorSchema);
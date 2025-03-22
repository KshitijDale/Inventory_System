const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    bill_date: { type: Date, required: true },
    bill_record_ts: { type: Date, default: Date.now },
    bill_amt: { type: Number, required: true },
    added_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  });

module.exports = mongoose.model('Bill', billSchema);  
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true }, //Reference to Vendor
    paid_amt: { type: Number, default: 0 },
    pay_channel: { type: String },
    payment_date: { type: Date, required: true },
    done_by: { type: String, required: true },
    record_dt: { type: Date, default: Date.now },
    record_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } //Reference to User
  });

module.exports = mongoose.model('Payment', paymentSchema);
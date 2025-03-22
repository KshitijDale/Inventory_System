const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, //Reference to Product
    recorded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, //Reference to User
    time: { type: Date, default: Date.now },
    quantity: { type: Number, required: true },
    comment: { type: String, default: "None" }
  });

module.exports = mongoose.model('Movement', movementSchema);
  
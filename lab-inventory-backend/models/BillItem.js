const mongoose = require('mongoose');

const billItemSchema = new mongoose.Schema({
    bill: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  });
  
module.exports = mongoose.model('BillItem', billItemSchema);
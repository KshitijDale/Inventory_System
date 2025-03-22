const mongoose = require('mongoose');

const vendorOfProductSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    latest_price: { type: Number, required: true },
    latest_date: { type: Date, default: Date.now }
  },{ timestamps: { createdAt: 'created_at', updatedAt: 'latest_date' } });
  
module.exports = mongoose.model('VendorOfProduct', vendorOfProductSchema);


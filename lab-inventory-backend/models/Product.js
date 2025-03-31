const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    prd_name: { type: String, required: true },
    pack: { type: String, required: true }, 
    mfg: { type: String, required: true },
    quant: {type: Number, default: 0},
    price: {type: Number, default: 0},
    unit: { type: String, default: 'N' },
    min_quantity: { type: Number, default: 0 }
  });
  
module.exports = mongoose.model('Product', productSchema);
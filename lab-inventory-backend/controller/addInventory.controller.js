const asynchandler = require("../utils/asynchandler");
const User = require("./../models/User");
const Vendor = require("./../models/Vendor");
const Bill = require('./../models/Bill');
const BillItem = require('./../models/BillItem');
const express = require('express');
const Product = require("./../models/Product");
const APIError = require("./../utils/APIError");
const ApiResponse = require("./../utils/ApiResponce");
const VendorOfProduct = require("../models/VendorOfProduct");

const addtoDatabase = asynchandler(async (vendor_id, new_bill_id, product)=>{

    const {product_name, quantity,price} = product;
    let product_detail = await Product.findOneAndUpdate(
        {prd_name: product_name},
        {   
            $inc : {quant : quantity},
            $set: {price: price}
        },
        {new : true}
    );
    if(!product_detail){
        // here write the code to add the product
        product_detail = await Product.create({prd_name: product_name, quant: quantity, price: price});
    }
    const new_bill_item = await BillItem.create({bill : new_bill_id, product : product_detail._id, quantity: quantity, price:price});
    let new_vendorOfProduct =  await VendorOfProduct.findOneAndUpdate({product: product_detail._id, vendor: vendor_id},
        {$set: {latest_price: price}}
    );
    if(!new_vendorOfProduct){
        new_vendorOfProduct = await VendorOfProduct.create({product: product_detail._id, vendor: vendor_id, latest_price: price});
    }

})

const addProducts = async (vendor_id, new_bill_id, product_details)=>{

    const productArray = Object.values(product_details);
    await Promise.all(productArray.map(product=>addtoDatabase(vendor_id, new_bill_id, product)));

}

exports.addInventory = asynchandler(async (req,res)=>{
    const{vendor_name, bill_date, bill_amount, product_details} = req.body;
    if (!vendor_name || !bill_date || !bill_amount || !product_details) {
        throw new APIError(400, "Missing required fields");
    }
    const vendor_detail = await Vendor.findOne({name: vendor_name});
    if(!vendor_detail){
        throw new APIError(400, "Vendor Not Found- Add Vendor Details");
    }
    const new_bill = await Bill.create({vendor: vendor_detail._id, bill_amt : bill_amount, bill_date: bill_date, added_by:req.user._id});

    const process  = await addProducts(vendor_detail._id, new_bill._id, product_details);
    res.json(product_details);
})

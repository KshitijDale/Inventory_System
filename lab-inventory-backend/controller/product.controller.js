const asynchandler = require("../utils/asynchandler");
const User = require("./../models/User");
const express = require('express');
const Product = require("./../models/Product");
const VendorOfProduct = require('./../models/VendorOfProduct');
const APIError = require("./../utils/APIError");
const ApiResponse = require("./../utils/ApiResponce");
const Vendor = require("../models/Vendor");


exports.allProducts = asynchandler(async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    const products = await Product.find().skip(skip).limit(limit);
    res.json({ products });
});

exports.GetDetail = asynchandler(async (req, res) => {
    const prd_name = req.query.prd_name || "abc";
    console.log("checkpoint : ", prd_name);

    // Find the product details
    const product_details = await Product.findOne({ prd_name: prd_name });
    if (!product_details) {
        throw new APIError(400, "The Product could not be found");
    }

    // Find vendor details while populating the vendor field
    const vendors = await VendorOfProduct.find({ product: product_details._id })
        .populate("vendor", "name") // Populating the vendor field and selecting only the 'name' field
        .select("vendor latest_price latest_date"); // Selecting only required fields

    if (!vendors.length) {
        throw new APIError(400, "Not able to find the product's vendors");
    }

    res.json({
        "product": product_details,
        "vendors": vendors
    });
});


exports.productList = asynchandler(async (req,res)=>{
    const products = await Product.find().select("prd_name");
    console.log("product.controlller: ",products);
    res.json({ products });
})


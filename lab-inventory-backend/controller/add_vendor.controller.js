const Vendor = require("./../models/Vendor");
const express = require('express');
const APIError = require("./../utils/APIError");
const ApiResponse = require("./../utils/ApiResponce");
const asynchandler = require("../utils/asynchandler");

exports.add_vendor = asynchandler(async (req,res)=>{
    const {vendor_name, vendor_addr} = req.body;
    const new_vendor = await Vendor.create({name: vendor_name, address: vendor_addr});
    res.json({ message: "Vendor is Created", vendor: new_vendor });
});

exports.getVendor =asynchandler(async (req,res)=>{
    const vendors = await Vendor.find();
    if(!vendors){
        throw new APIError(400,"Not able to fetch Vendors");
    }
    res.json(vendors);
});
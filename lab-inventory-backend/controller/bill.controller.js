const asynchandler = require("../utils/asynchandler");
const Bill = require("./../models/Bill");
const BillItem = require("./../models/BillItem");
const APIError = require("../utils/APIError");

exports.getbills = asynchandler(async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const bills = await Bill.find().populate("vendor", "name").populate("added_by", "name").sort({ bill_date: -1 }).skip(skip).limit(limit);
    const totalBills = await Bill.countDocuments();
    res.json({ bills, total: totalBills, page, limit });

});

exports.bill = asynchandler(async(req,res)=>{
    const bill_id = req.query.bill_id;
    const bill_items = await BillItem.find({bill: bill_id}).populate("product", "prd_name");;
    console.log("checkpoint in bill controller: ", bill_items);
    res.json(bill_items);
});
const asynchandler = require("../utils/asynchandler");
const Vendor = require("./../models/Vendor");
const Payment = require("./../models/Payment");
const Bill = require("./../models/Bill");
const APIError = require("../utils/APIError");

exports.payment = asynchandler(async(req,res)=>{
    const { vendor_name, paid_amt, pay_channel, payment_date, done_by} = req.body;
    const vendor_detail = await Vendor.findOne({name: vendor_name});
    if(!vendor_detail){
        throw new APIError(400, "Vendor not found. Kindly check again");
    }
    const payment_detail = await Payment.create({vendor: vendor_detail._id, paid_amt:paid_amt,
        pay_channel: pay_channel, payment_date: payment_date, done_by:  done_by, record_by: req.user._id
    });
    if(!payment_detail){
        throw new APIError(400, "The Payment was not recorded into the system");
    }
    res.json(payment_detail);
})

exports.getPayments = asynchandler(async (req,res)=>{
    const { vendor_name } = req.body;
    const page_no = req.query.page;
    const limit = 25;
    const skip = (page_no - 1)*limit;
    if(!vendor_name){
        const allPayments = await Payment.find()
            .populate("vendor", "name") // Populate vendor field with only the "name"
            .skip(skip)
            .limit(limit)
            .lean(); // Convert Mongoose documents to plain JavaScript objects

        if (!allPayments || allPayments.length === 0) {
            throw new APIError(400, "Not able to get the payments");
        }

        // If you need to explicitly remove the vendor field's ObjectId and only keep the name:
        const updatedPayments = allPayments.map(payment => ({
            ...payment,
            vendor: payment.vendor?.name || null // Replace vendor with just the name
        }));

        
        return res.json(updatedPayments);
    }
    const vendor_detail = await Vendor.findOne({name: vendor_name}).select("_id");
    if(!vendor_detail){
        throw new APIError(400, "Vendor not found");
    }
    const payments = await Payment.find({vendor : vendor_detail._id}).skip(skip).limit(limit); // Here a issue might rize
    // That the payments for a particular vendor will show on page 1 but the page 2 might get some error cause we wouldnt have the vendor name stored right?
    res.json(payments);
})

exports.getBills = asynchandler(async (req,res)=>{
    const { vendor_name } = req.body;
    if(!vendor_name){
        const allBills = await Bill.find();
        if(!allBills){
            throw new APIError(400,"Not able to get the payments");
        }
        return res.json(allBills);
    }
    const vendor_detail = await Vendor.findOne({name: vendor_name}).select("_id");
    if(!vendor_detail){
        throw new APIError(400, "Vendor not found");
    }
    const payments = await Bill.find({vendor : vendor_detail._id});
    res.json(payments);
})
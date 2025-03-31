const asynchandler = require("../utils/asynchandler");
const Vendor = require("./../models/Vendor");
const Payment = require("./../models/Payment");
const Bill = require("./../models/Bill");
const APIError = require("../utils/APIError");
const mongoose = require('mongoose');


exports.getVendorLedger = asynchandler(async (req, res) => {
    const { vendor_id } = req.query;
    const { start_date } = req.query;  // Format: YYYY-MM-DD
    

    if (!vendor_id || !start_date) {
        throw new APIError(400, "Vendor ID and Start Date are required");
    }

    const startDate = new Date(start_date);

    // 1️⃣ Get Opening Balance (Sum of all transactions before start_date)
    const totalBillsBefore = await Bill.aggregate([
        { $match: { vendor: new mongoose.Types.ObjectId(vendor_id), bill_date: { $lt: startDate } } },
        { $group: { _id: null, total: { $sum: "$bill_amt" } } }
    ]);

    const totalPaymentsBefore = await Payment.aggregate([
        { $match: { vendor: new mongoose.Types.ObjectId(vendor_id), payment_date: { $lt: startDate } } },
        { $group: { _id: null, total: { $sum: "$amount_paid" } } }
    ]);

    const openingBalance = (totalBillsBefore[0]?.total || 0) - (totalPaymentsBefore[0]?.total || 0);
    

    // 2️⃣ Fetch Bills & Payments on or after start_date
    const bills = await Bill.find({ vendor: vendor_id, bill_date: { $gte: startDate } })
                            .select("bill_date bill_amt bill_record_ts")
                            .sort({ bill_date: 1 });

    const payments = await Payment.find({ vendor: vendor_id, payment_date: { $gte: startDate } })
                                  .select("payment_date paid_amt")
                                  .sort({ payment_date: 1 });

    // 3️⃣ Merge, Sort, and Compute Running Balance
    let ledger = [{ 
        date: startDate, 
        type: "Opening Balance", 
        debit: 0,
        credit: 0,
        running_balance: openingBalance, 
        details: "Balance carried forward"
    }];

    bills.forEach(bill => {
        ledger.push({
            date: bill.bill_date,
            type: "Bill",
            debit: bill.bill_amt,
            credit: 0,
            details: `Bill recorded on ${bill.bill_record_ts}`
        });
    });

    payments.forEach(payment => {
        ledger.push({
            date: payment.payment_date,
            type: "Payment",
            debit: 0,
            credit: payment.paid_amt, // Negative to indicate deduction
            details: `Payment received`
        });
    });

    // Sort ledger entries by date (ascending)
    ledger.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Calculate Running Balance
    let running_balance = openingBalance;
    ledger = ledger.map(entry => {
        running_balance += entry.debit;
        running_balance -= entry.credit;
        return { ...entry, running_balance };
    });
    // console.log("checkpoint: ", ledger);
    res.json({ vendor_id, start_date, openingBalance, ledger });
});

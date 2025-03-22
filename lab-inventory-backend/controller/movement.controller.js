const asynchandler = require("../utils/asynchandler");
const Product = require("./../models/Product");
const Movement = require("./../models/Movement");
const User =  require("./../models/User");
const APIError = require("../utils/APIError");


exports.movement = asynchandler( async (req,res)=>{
    const {prd_name, quantity, comment} = req.body;
    const product = await Product.findOne({ prd_name: prd_name });

    if (!product) {
        throw new Error("Product not found");
    }
    
    if (product.quant - quantity < product.min_quantity) {
        throw new Error(`Quantity cannot go below the minimum limit of ${product.min_quantity}`);
    }
    
    // Proceed with the update only if the condition is met
    const product_details = await Product.findOneAndUpdate(
        { prd_name: prd_name },
        { $inc: { quant: -quantity } },
        { new: true }
    );
    
    const new_movement = await Movement.create({product: product_details._id, recorded_by: req.user._id, quantity: quantity, comment: comment});
    if(!new_movement){
        throw new APIError(400, "The movement could not be logged in");
    }
    res.json({message: "Stock added Successfully ", movement: new_movement});
});

exports.allMovements = asynchandler(async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = 25;
    const skip = (page - 1) * limit;
    const name = req.query.name || "";
    if(name !== ""){
        const user_id = await User.findOne({name: name}).select("_id");
        const movements = await Movement.find({recorded_by: user_id}).skip(skip).limit(limit).populate("product","prd_name").populate("recorded_by","name");
        return res.json({movements});
    }


    const product = req.query.product || "";
    console.log("backend check: ",product);
    if(product !== ""){
        const product_id = await Product.findOne({prd_name: product}).select("_id");
        const movements = await Movement.find({product: product_id}).skip(skip).limit(limit).populate("product","prd_name").populate("recorded_by","name");
        return res.json({movements});
    }


    const date = req.query.date || "";
    console.log("backend check: ",date);
    if(date !== ""){
        const startDate = new Date(date); // "YYYY-MM-DD" -> Date object
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);
        const movements = await Movement.find({time: { $gte: startDate, $lte: endDate }}).skip(skip).limit(limit).populate("product","prd_name").populate("recorded_by","name");
        return res.json({movements});
    }


    const movements = await Movement.find().skip(skip).limit(limit).populate("product","prd_name").populate("recorded_by","name");
    res.json({ movements });
});

exports.getAllUsers = asynchandler(async (req,res)=>{
    const users = await User.find();
    res.json({ users });
});
const asynchandler = require("../utils/asynchandler");
const Product = require("./../models/Product");
const Movement = require("./../models/Movement");
const User =  require("./../models/User");
const APIError = require("../utils/APIError");


const movement = asynchandler( async (stock,user_id)=>{
    const {prd_name,pack, mfg, quantity, comment} = stock;
    
    if(prd_name === "") return;
    const product = await Product.findOne({ prd_name: prd_name , pack:pack, mfg:mfg});
    
    if (!product) {
        throw new Error("Product not found");
    }
    
    if (product.quant - quantity < product.min_quantity) {
        throw new Error(`Quantity cannot go below the minimum limit of ${product.min_quantity}`);
    }
    
    // Proceed with the update only if the condition is met
    const product_details = await Product.findOneAndUpdate(
        { prd_name: prd_name ,pack:pack, mfg:mfg},
        { $inc: { quant: -quantity } },
        { new: true }
    );
    
    const new_movement = await Movement.create({product: product_details._id, recorded_by: user_id, quantity: quantity, comment: comment});
    console.log("Backend Checkpoint: ", new_movement);
    if(!new_movement){
        throw new APIError(400, "The movement could not be logged in");
    }
});

exports.movements = asynchandler(async(req,res)=>{
    const stockData = req.body;
    
    
    if(!stockData) {
        throw new APIError(400, "No stock data Reached the Backend");
    }
    const StockArray = Object.values(stockData);
    await Promise.all(StockArray.map(stock=>movement(stock,req.user._id)));
    res.json("Stock Transaction successfull")

})

exports.allMovements = asynchandler(async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = 25;
    const skip = (page - 1) * limit;
    const name = req.query.name || "";
    if(name !== ""){
        const user_id = await User.findOne({name: name}).select("_id");
        const movements = await Movement.find({recorded_by: user_id}).skip(skip).limit(limit).populate({
            path: "product",
            select: "prd_name pack mfg"
        }).populate("recorded_by","name");
        return res.json({movements});
    }


    const product = req.query.product || "";
    if(product !== ""){
        const movements = await Movement.find({product: product}).skip(skip).limit(limit).populate({
            path: "product",
            select: "prd_name pack mfg"
        }).populate("recorded_by","name");
        console.log("backend Check: ",movements);
        return res.json({movements});
    }


    const date = req.query.date || "";
    
    if(date !== ""){
        const startDate = new Date(date); // "YYYY-MM-DD" -> Date object
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);
        const movements = await Movement.find({time: { $gte: startDate, $lte: endDate }}).skip(skip).limit(limit).populate({
            path: "product",
            select: "prd_name pack mfg"
        }).populate("recorded_by","name");
        return res.json({movements});
    }


    const movements = await Movement.find().skip(skip).limit(limit).populate({
        path: "product",
        select: "prd_name pack mfg"
    }).populate("recorded_by","name");
    res.json({ movements });
});

exports.getAllUsers = asynchandler(async (req,res)=>{
    const users = await User.find();
    res.json({ users });
});
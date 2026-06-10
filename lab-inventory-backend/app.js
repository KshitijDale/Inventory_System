const express = require('express')
const cors = require('cors');
const userRouter = require('./routes/user.route');
const productList = require('./routes/product.route');
const addInventory = require('./routes/addInventory.route');
const add_vendor = require('./routes/add_vendor.route');
const movement = require('./routes/movement.route');
const payment = require('./routes/payment.route');
const bills = require("./routes/bills.route");
const Search = require("./routes/search.router");
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
let app = express();

app.use(cors({
    origin: "https://stellar-gingersnap-b6eb63.netlify.app",  // Allow frontend requests also change to the wlp ip address when not rumming locally.  http://localhost:3000
    credentials: true,  // Allow cookies and headers
    methods: "GET,POST,PUT,DELETE",  // Allowed request methods
    allowedHeaders: "Content-Type,Authorization"  // Allowed headers
  }));
  
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(morgan('dev'));
app.get('/',(req,res)=>{
  res.json("Hello world!!");
})
app.use('/api/user',userRouter);
app.use('/api/product',productList);
app.use('/api/add_inventory',addInventory);
app.use('/api/vendor',add_vendor);
app.use('/api/movement',movement);
app.use('/api/payment',payment);
app.use('/api/bills', bills);
app.use('/api/search',Search);
module.exports = app;

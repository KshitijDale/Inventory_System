const express = require("express");
const asynchandler = require("../utils/asynchandler");
const Product = require("../models/Product");
const APIError = require("../utils/APIError");
const { verifyJWT } = require("../middleware/auth.middleware");
const { getSearch } = require("./../controller/search.controller");


const router = express.Router();

// Search Products API
router.route("/").get(verifyJWT,getSearch);

module.exports = router;

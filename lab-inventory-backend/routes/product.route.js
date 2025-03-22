const express = require('express');
const asynchandler = require('./../utils/asynchandler');
const APIError = require("./../utils/APIError");
const User = require("./../models/User");
const {allProducts, GetDetail, productList} = require('./../controller/product.controller');
const { verifyJWT } = require("./../middleware/auth.middleware");

const router = express.Router();

router.route('/all_products').get(verifyJWT,allProducts);
router.route('/get_detail').get(verifyJWT, GetDetail);
router.route('/productList').get(verifyJWT,productList);

module.exports = router;
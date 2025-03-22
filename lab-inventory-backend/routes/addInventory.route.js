const express = require('express');
const asynchandler = require('./../utils/asynchandler');
const APIError = require("./../utils/APIError");
const { addInventory } = require("./../controller/addInventory.controller");
const { verifyJWT } = require("./../middleware/auth.middleware");

const router = express.Router();

router.route('/').post(verifyJWT, addInventory);

module.exports = router;
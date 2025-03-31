const express = require('express');
const { verifyJWT } = require("./../middleware/auth.middleware");
const { getbills ,bill} = require("./../controller/bill.controller");

router = express.Router();

router.route("/").get(verifyJWT, getbills);
router.route("/detail").get(verifyJWT,bill);
module.exports = router;
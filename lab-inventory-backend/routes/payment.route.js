const express = require('express');
const { verifyJWT } = require("./../middleware/auth.middleware");
const { payment, getPayments } = require("./../controller/payment.controller");

router = express.Router();

router.route('/').post(verifyJWT,payment);
router.route('/').get(verifyJWT,getPayments);

module.exports = router;
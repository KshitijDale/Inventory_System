const express = require('express');
const { verifyJWT } = require("./../middleware/auth.middleware");
const { add_vendor, getVendor } = require("./../controller/add_vendor.controller");
const {getVendorLedger} = require("./../controller/getledger.controller");

router = express.Router();

router.route('/').post(verifyJWT, add_vendor);
router.route('/get_vendors').get(verifyJWT,getVendor)
router.route('/get_ledger').get(verifyJWT,getVendorLedger);

module.exports = router;
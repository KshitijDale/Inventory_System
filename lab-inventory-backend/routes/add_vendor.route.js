const express = require('express');
const { verifyJWT } = require("./../middleware/auth.middleware");
const { add_vendor, getVendor } = require("./../controller/add_vendor.controller");

router = express.Router();

router.route('/').post(verifyJWT, add_vendor);
router.route('/get_vendors').get(verifyJWT,getVendor)

module.exports = router;
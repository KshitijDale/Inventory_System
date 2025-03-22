const express = require('express');
const asynchandler = require('./../utils/asynchandler');
const APIError = require("./../utils/APIError");
const User = require("./../models/User");
const { registerUser, loginUser, logoutUser } = require('../controller/user.controller');
const { getAllUsers } = require("./../controller/movement.controller");
const { verifyJWT } = require('./../middleware/auth.middleware');


const router = express.Router();

router.route('/register').post(registerUser);
// router.route('/add_user_type').post(generate_user_types);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/getUsers').get(verifyJWT,getAllUsers)

module.exports = router;
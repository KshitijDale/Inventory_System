const express = require('express');
const { verifyJWT } = require("./../middleware/auth.middleware");
const { movement, allMovements } = require("./../controller/movement.controller");

router = express.Router();

router.route('/')
    .post(verifyJWT, movement)
    .get(verifyJWT,allMovements);

module.exports = router;
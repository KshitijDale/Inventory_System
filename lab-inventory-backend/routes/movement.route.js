const express = require('express');
const { verifyJWT } = require("./../middleware/auth.middleware");
const { movements, allMovements } = require("./../controller/movement.controller");

router = express.Router();

router.route('/')
    .post(verifyJWT, movements)
    .get(verifyJWT,allMovements);

module.exports = router;
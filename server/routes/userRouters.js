const express = require('express')
const router = express.Router();
const auth = require('../middlewares/auth');

const userCtrl = require('../controllers/userCtrl');

// Register User
router.post("/register", userCtrl.registerUser)
// Login User
router.post("/login", userCtrl.loginUser)

router.get("/verify", userCtrl.verifiedToken)

module.exports = router
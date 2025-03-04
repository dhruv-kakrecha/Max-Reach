const express = require("express");
const router = express.Router();
const { sendOtp, verifyOtp, createUser } = require("../conrollers/auth");

router.post("/create-user", createUser);

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;

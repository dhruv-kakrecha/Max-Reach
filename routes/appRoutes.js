const express = require('express');
const { allAppData, getUserDetails } = require('../conrollers/appController');

const router = express.Router();

router.get("/app" , allAppData)
router.get("/user" , getUserDetails)

module.exports = router; 

const express = require('express');
const { findAll } = require('../conrollers/userController');

const router = express.Router();
       
router.get("/all", findAll)

module.exports = router; 

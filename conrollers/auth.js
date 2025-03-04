const express = require("express");
const Users = require("../models/auth");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({ phone: user.phone }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

exports.createUser = async (req, res) => {
    const { phone, fixotp } = req.body;

    if (!phone || !fixotp) {
        return res.status(400).json({ status: false, message: "Please provide a phone number and OTP" });
    }

    try {
        let user = await Users.findOne({ phone });
        if (user) {
            return res.status(400).json({ status: false, message: "User already exists" });
        }
        const newUser = new Users({ phone, fixotp });
        await newUser.save();
        res.json({ status: true, message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Server error" });
    }
};

exports.sendOtp = async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ status: false, message: "Please provide a phone number" });
    }

    try {
        let user = await Users.findOne({ phone });
        if (!user) {
            return res.status(400).json({ status: false, message: "You don't have access" });
        }

        // Save OTP timestamp
        user.otpTimestamp = Date.now();
        await user.save();

        return res.status(200).json({ status: true, message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.verifyOtp = async (req, res) => {
    const { phone, otp } = req.body;

    if (!phone) {
        return res.status(400).json({ status: false, message: "Please provide a phone number" });
    }

    if (!otp) {
        return res.status(400).json({ status: false, message: "Please provide an OTP" });
    }

    try {
        const user = await Users.findOne({ phone });
        if (!user) {
            return res.status(400).json({ status: false, message: "You don't have access" });
        }

        // Check if OTP is expired (1 minute)
        const currentTime = Date.now();
        if (user.otpTimestamp && currentTime - user.otpTimestamp > 60000) {
            return res.status(401).json({ status: false, message: "OTP expired. Please request a new one." });
        }

        if (user.fixotp !== otp) {
            return res.status(401).json({ status: false, message: "Invalid OTP" });
        }

        const token = generateToken(user);
        res.json({ status: true, message: "Login successful", token });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: "Server error" });
    }
};

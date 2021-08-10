const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { sendJwt } = require('../helper/Auth/sendJwt');

router.get("/", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        res.status(404).json({
            success: false,
            data: 'User not found'
        })
    }
    if (bcrypt.compareSync(password, user.password)) {
        sendJwt(user, res);
    }
    else {
        res.status(400).json({
            success: false,
            data: 'Password is incorrect'
        })
    }
});

module.exports = router
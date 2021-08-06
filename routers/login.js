const express = require('express');
const router = express.Router();
require('../helper/connectdatabase')();
const User = require('../models/user');

router.get("/", async(req, res) => {
    const {email, password } = req.body;

    const user = await User.findOne({email}).select("+password");
    console.log(user)
    res.json({
        success: true,
       
    })
});

module.exports = router
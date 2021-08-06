const express = require('express');
const router = express.Router();
require('../helper/connectdatabase')();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {sendJwt} = require('../helper/Auth/sendJwt');


router.get("/", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    console.log(user)
    if (bcrypt.compareSync(password, user.password)) {
        sendJwt(user, res);
    }
    else {
        console.log('eşleşmiyor')
    }



});

module.exports = router
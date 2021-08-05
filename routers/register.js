const express = require('express');
const router = express.Router();
require('../helper/connectdatabase')();
const { accessControl } = require('../middleware');
router.use(accessControl);
const User = require('../models/user');
const {sendJwt} = require('../helper/Auth/sendJwt');

router.post("/", async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({
            name,
            email,
            password
        });
        sendJwt(user, res);

    } catch (error) {
        return next(error);
    }
});


module.exports = router
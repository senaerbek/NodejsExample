const express = require('express');
const router = express.Router();
const {accessControl} = require('../middleware');
router.use(accessControl);
const User = require('../models/user');

router.post("/", async (req, res, next) => {
    const {name, email, password} = req.body;
    try {
        const user = await User.create({
            name,
            email,
            password
        });
        res.status(200).json({
            success: true,
            data: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        const userControl = await User.findOne({email});
        if (userControl) {
            res.status(401).json({
                success: false,
                data: 'User already exist'
            })
        }
        return next(error);
    }
});

module.exports = router

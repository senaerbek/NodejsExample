const express = require('express');
const router = express.Router();
require('../helper/connectdatabase')();
const { getToken } = require('../middlewares/authMiddleware');
router.use(getToken)

router.get("/", (req, res) => {
    res.json({
        success: true,
        data: {
            id: req.user.id,
            name: req.user.name
        }
    })
});

module.exports = router
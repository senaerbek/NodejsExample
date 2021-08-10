const jwt = require('jsonwebtoken');

const getToken = (req, res, next) => {
    const {JWT_SECRET_KEY} = process.env;
    console.log(req.headers)
    if (req.headers.authorization) {
        const accessToken = req.headers.authorization.split(" ")[1];
        jwt.verify(accessToken, JWT_SECRET_KEY, (
            err, decoded
        ) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    res.status(401).json({
                        success: false,
                        data: 'Unauthorized'
                    })
                }
                console.log(err);
            }
            req.user = {
                id: decoded.id,
                name: decoded.name,
            }
        });
    } else {
        res.status(401).json({
            success: false,
            data: 'Unauthorized'
        })
    }
    next();
}
module.exports = {getToken}

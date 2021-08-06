const jwt = require('jsonwebtoken');

const getToken = (req, res, next) => {
    const { JWT_SECRET_KEY } = process.env;
    if (req.headers.authorization) {
        const accessToken = req.headers.authorization.split(" ")[1];
        console.log(accessToken)
        jwt.verify(accessToken, JWT_SECRET_KEY, (
            err, decoded
        ) => {
            if (err) {
                console.log(err);
            }
            req.user = {
                id:decoded.id,
                name:decoded.name,
            }
        });
    }
    else {
        throw new Error('Error')
    }
    next();
}
module.exports = { getToken }
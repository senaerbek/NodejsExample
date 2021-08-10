const error = (err, req, res, next) => {
    res.status(400).json({
        success: false,
        data: err.message
    })
}

module.exports = {error};

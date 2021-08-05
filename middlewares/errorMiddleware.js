const error = (err, req, res, next) => {
    // console.log('Hata oluştu');

    res.status(400).json({
        success: false
    })

}

module.exports = { error };
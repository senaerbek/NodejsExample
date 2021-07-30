const accessControl = (req, res, next) => {
    console.log('middleware');
    next();
}
module.exports = { accessControl }
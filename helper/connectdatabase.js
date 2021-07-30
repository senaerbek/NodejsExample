const mongoose = require('mongoose');

const connectionDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true, useUnifiedTopology: true,
    })
        .then(() => {
            console.log('connected');
        })
        .catch((err) => {
            console.log('err',err)
        })
}

module.exports = connectionDatabase;
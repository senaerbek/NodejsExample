const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('question',questionSchema);
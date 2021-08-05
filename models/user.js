const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'please try a different email'],
        match: [
            /^[^\W_]+[\.\-\\\'\+\&_]?[^\W_]+@[^\W_]+[\-\&\\\'_]?[^\W_]+\.[^\W_]{2,}(?:\.[^\W_]{2})?$/,
            'please provide a valid email'
        ]
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.generateJwtFromUser = function () {
    const { JWT_SECRET_KEY } = process.env;
    const payload = {
        id: this._id,
        name: this.name
    };
    const token = jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn:100
    });
    return token;
}
module.exports = mongoose.model('user', UserSchema);
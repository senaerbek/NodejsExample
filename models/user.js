const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: 100
    });
    return token;
}

UserSchema.pre("save", function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        });
    });
    next();
})

module.exports = mongoose.model('user', UserSchema);
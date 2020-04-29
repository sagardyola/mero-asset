const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        sparse: true //not check empty values unique
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true // remove whitespace
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: Number,
    dob: Date,
    status: {
        type: Boolean,
        default: 'true'
    },
    address: String,
    role: {
        type: Number,
        default: 2 //1 for admin 2 for normal user 3 for visitor
    },
    passwordResetExpiry: Date

}, {
    timestamps: true
});

const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel;
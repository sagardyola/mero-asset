const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, // remove whitespace
        sparse: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        sparse: true //not check empty values unique
    },
    password: {
        type: String,
        required: true
    },
    gender: String,
    dob: Date,
    phoneNumber: Number,
    address: String,
    image: String,
    status: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    passwordResetExpiry: Date,
    role: {
        type: Number,
        default: 2 //1 for admin 2 for normal user 3 for visitor
    }
}, {
    timestamps: true
});

// UserSchema
//     .virtual("fullName")
//     .get(function () {
//         return this.firstName + " " + this.lastName;
//     })


const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel;




// gender: {
//     type: String,
//     enum: ['male', 'female', 'others'],
// },
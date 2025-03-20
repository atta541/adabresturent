const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String, 
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false, 
    },
    emailVerificationCode: { type: String }, // OTP
    emailVerificationExpires: { type: Date }, // Expiry time
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

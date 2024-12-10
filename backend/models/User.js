const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'doctor', 'patient'], default: 'patient' },
    phone: { type: String },
    isVerified: { type: Boolean, default: false },
    otp: { type: String }, // Field to store OTP for verification
    token: { type: String }, // Field to store JWT token after successful OTP verification
}, {
    timestamps: true, // Optionally add timestamps for created and updated time
});

module.exports = mongoose.model('User', UserSchema);

// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['admin', 'doctor', 'patient'], default: 'patient' },
//     phone: { type: String },
//     isVerified: { type: Boolean, default: false },
// });

// module.exports = mongoose.model('User', UserSchema);

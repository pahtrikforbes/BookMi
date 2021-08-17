const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    mobileNumber: String,
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    role: {type: String, default: 'client'}
}, { collation: { locale: 'en_US', strength: 1 }, timestamps: true });

userSchema.index({ email: 1 });
userSchema.index({ resetPasswordToken: 1 });
userSchema.index({ resetPasswordExpires: 1 });
mongoose.model("users",userSchema)
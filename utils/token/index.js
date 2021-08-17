const mongoose = require("mongoose");
const Token = mongoose.model("tokens");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");


exports.generateVerificationToken = (id) => {
  let payload = {
    userId: id,
    token: crypto.randomBytes(20).toString("hex"),
  };

  return new Token(payload);
};

exports.generateJWT = (user) => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: user._id,
    email: user.email,
    mobilePhone: user.mobilePhone,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
  
};

exports.generateResetToken = (user) => {
  user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
  return user;
};;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
});

mongoose.model("users", userSchema);

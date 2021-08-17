const express = require("express");
const router = express.Router();
const {login,register,resendToken,verify} = require("../controllers/auth")
const Password = require("../controllers/password")
router.post("/register", register)
router.post("/login", login)
router.get("/verify/:token",verify)
router.post("/resend", resendToken)
router.get("/reset/:token", Password.reset);
router.post("/reset", Password.resetPassword);
router.post("/recover", Password.recover)
module.exports = router;




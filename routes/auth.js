const express = require("express");
const router = express.Router();
const {login,register,resendToken,verify} = require("../controllers/auth");
const { generateUrl, googleCallBack } = require("../controllers/google");
const Password = require("../controllers/password")
router.post("/register", register)
router.post("/login", login)
router.get("/verify/:token",verify)
router.post("/resend", resendToken)
router.get("/reset/:token", Password.reset);
router.post("/reset", Password.resetPassword);
router.post("/recover", Password.recover)
router.get("/google", generateUrl)
router.get("/google/callback", googleCallBack)
module.exports = router;




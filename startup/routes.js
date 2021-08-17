const express = require('express');
const appointments = require("../routes/appointment");
const hairStyles = require("../routes/hairStyle");
const auth = require("../routes/auth")
module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); 
    app.use("/api/appointment", appointments);
    app.use("/api/hairStyles", hairStyles);
    app.use("/api/auth", auth);
}

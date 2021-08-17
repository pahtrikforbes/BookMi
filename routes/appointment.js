const express = require("express");
const router = express.Router();
const { createAppointment, getAppointments, getAppointment, updateAppointment, deleteAppointment } = require("../controllers/appointment")
const {validateIdParams} = require("../middlewares/validateURLParams")
router.post("/", createAppointment)
router.get("/", getAppointments)
router.get("/:id",validateIdParams, getAppointment)
router.put("/:id",validateIdParams, updateAppointment)
router.delete("/:id", validateIdParams, deleteAppointment)
module.exports = router;
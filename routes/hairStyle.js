const express = require("express")
const router = express.Router();
const { createHairStyle, getHairStyle, getHairStyles, updateHairStyle, deleteHairStyle } = require("../controllers/hairStyle");
const parser = require("../middlewares/imageParser");
const {validateIdParams} = require("../middlewares/validateURLParams")
router.post("/", parser.single("imageUrl"), createHairStyle)
router.get("/", getHairStyles)
router.get("/:id", [parser.single("imageUrl"), validateIdParams], getHairStyle)
router.put("/:id", validateIdParams, updateHairStyle)
router.delete("/:id", validateIdParams, deleteHairStyle)
module.exports = router;
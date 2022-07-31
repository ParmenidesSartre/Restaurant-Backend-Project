const express = require("express");
const menuController = require("../../controllers/menu.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.route("/").post(upload.array("dish", 5), menuController.createMenu);
router.route("/:_id").patch(menuController.updateMenu);

module.exports = router;

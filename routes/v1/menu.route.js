const express = require("express");
const menuController = require("../../controllers/menu.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router
  .route("/")
  .post(upload.array("dish", 5), menuController.createMenu)
  .get(menuController.getAllMenus);
router
  .route("/:_id")
  .patch(menuController.updateMenu) // Can also be used to change published status
  .delete(menuController.deleteMenu);

module.exports = router;

const express = require("express");
const NhaXuatBanController = require("../controllers/nhaxuatban.controller");

const router = express.Router();

router.get("/", NhaXuatBanController.getAll);
router.get("/:id", NhaXuatBanController.getById);
router.post("/", NhaXuatBanController.create);
router.put("/:id", NhaXuatBanController.update);
router.delete("/:id", NhaXuatBanController.delete);

module.exports = router;

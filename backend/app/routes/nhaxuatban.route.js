const express = require("express");
const router = express.Router();
const NhaXuatBanController = require("../controllers/nhaxuatban.controller");

router.get("/", NhaXuatBanController.getAllNhaXuatBan);
router.get("/:id", NhaXuatBanController.getNhaXuatBanById);
router.post("/", NhaXuatBanController.createNhaXuatBan);
router.put("/:id", NhaXuatBanController.updateNhaXuatBan);
router.delete("/:id", NhaXuatBanController.deleteNhaXuatBan);

module.exports = router;

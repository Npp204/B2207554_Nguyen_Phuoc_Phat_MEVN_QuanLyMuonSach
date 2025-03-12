const express = require("express");
const router = express.Router();
const docGiaController = require("../controllers/docgia.controller");

// Lấy danh sách độc giả
router.get("/", docGiaController.getAllDocGia);

// Lấy độc giả theo ID
router.get("/:id", docGiaController.getDocGiaById);

// Tạo mới độc giả
router.post("/", docGiaController.createDocGia);

// Cập nhật thông tin độc giả
router.put("/:id", docGiaController.updateDocGia);

// Xóa độc giả
router.delete("/:id", docGiaController.deleteDocGia);

module.exports = router;

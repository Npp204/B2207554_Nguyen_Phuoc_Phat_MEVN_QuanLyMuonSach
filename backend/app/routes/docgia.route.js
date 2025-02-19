const express = require("express");
const router = express.Router();
const docGiaController = require("../controllers/docgia.controller");

// Lấy danh sách độc giả
router.get("/", docGiaController.getAllDocGia);

// Lấy độc giả theo ID
// router.get("/:id", docGiaController.getDocGiaById);

// Tạo mới độc giả
router.post("/", docGiaController.createDocGia);

// Cập nhật thông tin độc giả
router.put("/:id", docGiaController.updateDocGia);

// Xóa độc giả
router.delete("/:id", docGiaController.deleteDocGia);

// router.get("/", docGiaController.getAllOrSearchDocGia);

// // Tìm độc giả theo số điện thoại
// router.get("/sdt/:sdt", docGiaController.getDocGiaBySDT);

// // Tìm độc giả theo tên
// router.get("/ten/:ten", docGiaController.getDocGiaByTen);

// // Tìm độc giả theo mã độc giả
// router.get("/ma/:ma", docGiaController.getDocGiaByMa);

module.exports = router;

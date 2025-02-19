const express = require("express");
const router = express.Router();
const nhanVienController = require("../controllers/nhanvien.controller");

// Lấy danh sách nhân viên
router.get("/", nhanVienController.getAllNhanVien);

// Lấy nhân viên theo ID
router.get("/:id", nhanVienController.getNhanVienById);

// Tạo mới nhân viên
router.post("/", nhanVienController.createNhanVien);

// Cập nhật thông tin nhân viên
router.put("/:id", nhanVienController.updateNhanVien);

// Xóa nhân viên
router.delete("/:id", nhanVienController.deleteNhanVien);

module.exports = router;

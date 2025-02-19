const express = require('express');
const router = express.Router();

const sachController = require('../controllers/sach.controller');
//const { authMiddleware, requireNhanVien } = require("../middlewares/auth.middleware");

//router.use(authMiddleware); // Kiểm tra user trước khi xử lý API

// Chỉ nhân viên mới được thêm sách , requireNhanVien
router.post("/", sachController.createSach);

// Cả nhân viên & độc giả đều có thể xem danh sách sách
router.get("/", sachController.getAllSach);
router.get('/:id', sachController.getSachById);

// Chỉ nhân viên mới được cập nhật sách , requireNhanVien
router.put("/:id", sachController.updateSach);

// Chỉ nhân viên mới được xóa sách , requireNhanVien
router.delete("/:id", sachController.deleteSach);


module.exports = router;


const express = require('express');
const router = express.Router();

const sachController = require('../controllers/sach.controller');
const { upload, uploadErrorHandler } = require("../middlewares/upload.middleware"); // Import Multer
//const { authMiddleware, requireNhanVien } = require("../middlewares/auth.middleware");

//router.use(authMiddleware); // Kiểm tra user trước khi xử lý API

// Thêm sách (có upload hình ảnh)
router.post("/", upload.single("HINHANH"), uploadErrorHandler,sachController.createSach);

// Chỉ nhân viên mới được thêm sách , requireNhanVien
//router.post("/", sachController.createSach);

// Cả nhân viên & độc giả đều có thể xem danh sách sách
router.get("/", sachController.getAllSach);
router.get('/:id', sachController.getSachById);

// Chỉ nhân viên mới được cập nhật sách , requireNhanVien
// Cập nhật sách (có upload hình ảnh)
router.put("/:id", upload.single("HINHANH"), uploadErrorHandler, sachController.updateSach);

// Chỉ nhân viên mới được xóa sách , requireNhanVien
router.delete("/:id", sachController.deleteSach);


module.exports = router;





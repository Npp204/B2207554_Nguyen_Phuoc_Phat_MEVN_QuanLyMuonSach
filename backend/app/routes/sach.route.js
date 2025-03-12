const express = require('express');
const router = express.Router();

const sachController = require('../controllers/sach.controller');
const upload = require("../middlewares/upload.middleware"); // Import Multer
//const { authMiddleware, requireNhanVien } = require("../middlewares/auth.middleware");

//router.use(authMiddleware); // Kiểm tra user trước khi xử lý API

// Thêm sách (có upload hình ảnh)
router.post("/", upload.single("HINHANH"), sachController.createSach);

// Chỉ nhân viên mới được thêm sách , requireNhanVien
router.post("/", sachController.createSach);

// Cả nhân viên & độc giả đều có thể xem danh sách sách
router.get("/", sachController.getAllSach);
router.get('/:id', sachController.getSachById);

// Chỉ nhân viên mới được cập nhật sách , requireNhanVien
// Cập nhật sách (có upload hình ảnh)
router.put("/:id", upload.single("HINHANH"), sachController.updateSach);

// Chỉ nhân viên mới được xóa sách , requireNhanVien
router.delete("/:id", sachController.deleteSach);


module.exports = router;

// const express = require("express");
// const router = express.Router();

// const sachController = require("../controllers/sach.controller");
// const upload = require("../middlewares/upload.middleware"); // Middleware upload file
// const { authMiddleware, requireNhanVien } = require("../middlewares/auth.middleware");

// // Kiểm tra user trước khi xử lý API
// router.use(authMiddleware);  

// // Cả nhân viên & độc giả đều có thể xem sách
// router.get("/", sachController.getAllSach);
// router.get("/:id", sachController.getSachById);

// // Chỉ nhân viên mới được thêm sách
// router.post("/", requireNhanVien, upload.single("HINHANH"), sachController.createSach);

// // Chỉ nhân viên mới được cập nhật sách
// router.put("/:id", requireNhanVien, upload.single("HINHANH"), sachController.updateSach);

// // Chỉ nhân viên mới được xóa sách
// router.delete("/:id", requireNhanVien, sachController.deleteSach);

// module.exports = router;



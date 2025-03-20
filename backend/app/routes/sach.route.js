const express = require('express')
const router = express.Router()

const sachController = require('../controllers/sach.controller')
const {
  upload,
  uploadErrorHandler
} = require('../middlewares/upload.middleware') // Import Multer

// Thêm sách (có upload hình ảnh)
router.post(
  '/',
  upload.single('HINHANH'),
  uploadErrorHandler,
  sachController.createSach
)

// Lấy sách
router.get('/', sachController.getAllSach)
router.get('/:id', sachController.getSachById)

// Cập nhật sách (có upload hình ảnh)
router.put(
  '/:id',
  upload.single('HINHANH'),
  uploadErrorHandler,
  sachController.updateSach
)

// Xóa sách
router.delete('/:id', sachController.deleteSach)

module.exports = router

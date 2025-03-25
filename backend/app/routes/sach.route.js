const express = require('express')
const router = express.Router()

const sachController = require('../controllers/sach.controller')
const {
  upload,
  uploadErrorHandler
} = require('../middlewares/upload.middleware') 

router.post(
  '/',
  upload.single('HINHANH'),
  uploadErrorHandler,
  sachController.createSach
)

router.get('/', sachController.getAllSach)
router.get('/:id', sachController.getSachById)

router.put(
  '/:id',
  upload.single('HINHANH'),
  uploadErrorHandler,
  sachController.updateSach
)

router.delete('/:id', sachController.deleteSach)

module.exports = router

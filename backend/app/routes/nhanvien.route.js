const express = require('express')
const router = express.Router()
const nhanVienController = require('../controllers/nhanvien.controller')

router.get('/', nhanVienController.getAllNhanVien)

router.get('/:id', nhanVienController.getNhanVienById)

router.post('/', nhanVienController.createNhanVien)

router.put('/:id', nhanVienController.updateNhanVien)

router.delete('/:id', nhanVienController.deleteNhanVien)

module.exports = router

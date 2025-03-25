const express = require('express')
const router = express.Router()
const docGiaController = require('../controllers/docgia.controller')

router.get('/', docGiaController.getAllDocGia)

router.get('/:id', docGiaController.getDocGiaById)

router.post('/', docGiaController.createDocGia)

router.put('/:id', docGiaController.updateDocGia)

router.delete('/:id', docGiaController.deleteDocGia)

module.exports = router

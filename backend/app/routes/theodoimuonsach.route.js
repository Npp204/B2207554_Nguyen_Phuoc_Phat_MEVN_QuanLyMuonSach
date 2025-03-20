const express = require('express')
const router = express.Router()

const theoDoiController = require('../controllers/theodoimuonsach.controller')

router.get('/', theoDoiController.getAllRecords)
router.get('/:id', theoDoiController.getRecordById)
router.post('/', theoDoiController.createRecord)
router.put('/:id', theoDoiController.updateStatus)
router.delete('/:id', theoDoiController.deleteRecord)

module.exports = router

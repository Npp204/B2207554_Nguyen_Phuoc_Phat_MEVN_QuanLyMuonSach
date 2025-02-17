const express = require('express');
const router = express.Router();

const sachController = require('../controllers/sach.controller');

router.get('/', sachController.getAllBooks);
router.get('/:id', sachController.getBookById);
router.post('/', sachController.createBook);
router.put('/:id', sachController.updateBook);
router.delete('/:id', sachController.deleteBook);

module.exports = router;


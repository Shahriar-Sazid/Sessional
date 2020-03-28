const express = require('express');
const invoiceController = require('../_controllers/invoiceController');

const router = express.Router();

router.get('/', invoiceController.getAllInvoice);

module.exports = router;

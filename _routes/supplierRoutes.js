const express = require('express');
const supplierController = require('../_controllers/supplierController');

const router = express.Router();

router.get('/name', supplierController.getSupplierName);
module.exports = router;

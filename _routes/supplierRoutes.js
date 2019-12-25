const express = require('express');
const supplierController = require('../_controllers/supplierController');

const router = express.Router();

router.get('/name', supplierController.getSupplierName);

router
  .route('/')
  .post(supplierController.addSupplier)
  .patch(supplierController.updateSupplier);

module.exports = router;

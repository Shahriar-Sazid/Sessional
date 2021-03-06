const express = require('express');
const productController = require('../_controllers/productController');

const router = express.Router();

router.post('/', productController.addProduct);

router
  .patch('/', productController.updateProduct)
  .delete('/', productController.deleteProduct);

module.exports = router;

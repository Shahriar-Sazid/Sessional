const express = require('express');
const productController = require('../_controllers/productController');

const router = express.Router();

router.post('/', productController.addProducts);

router
  .route('/:id')
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

router.post('/shift', productController.shiftProduct);

module.exports = router;

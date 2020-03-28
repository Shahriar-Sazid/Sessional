const express = require('express');
const viewsController = require('../_controllers/viewController');

const router = express.Router();

router
  .get('/product', viewsController.getProductPage)
  .get('/customer', viewsController.getCustomerPage)
  .get('/supplier', viewsController.getSupplierPage)
  .get('/godown', viewsController.getGodownPage)
  .get('/account', viewsController.getAccountPage)
  .get('/stock/', viewsController.getStockPage)
  .get('/stock/buy', viewsController.getBuyPage)
  .get('/stock/sell', viewsController.getSellPage)
  .get('/invoice', viewsController.getInvoicePage);

module.exports = router;

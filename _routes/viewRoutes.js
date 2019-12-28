const express = require('express');
const viewsController = require('../_controllers/viewController');

const router = express.Router();

router.get('/product', viewsController.getProductPage);

router.get('/customer', viewsController.getCustomerPage);

router.get('/supplier', viewsController.getSupplierPage);

router.get('/godown', viewsController.getGodownPage);

router.get('/account', viewsController.getAccountPage);

module.exports = router;

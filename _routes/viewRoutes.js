const express = require('express');
const viewsController = require('../_controllers/viewsController');

const router = express.Router();

router.get('/product', viewsController.getProductPage);

router.get('/customer', viewsController.getCustomerPage);
module.exports = router;

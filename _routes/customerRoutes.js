const express = require('express');
const customerController = require('../_controllers/customerController');

const router = express.Router();

router
  .route('/')
  .post(customerController.addCustomer)
  .patch(customerController.updateCustomer);

module.exports = router;

const express = require('express');
const accountController = require('../_controllers/accountController');

const router = express.Router();

router
  .route('/')
  .post(accountController.addAccount)
  .patch(accountController.updateAccount);

module.exports = router;

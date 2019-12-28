const express = require('express');
const godownController = require('../_controllers/godownController');

const router = express.Router();

router.get('/name', godownController.getGodownName);

router
  .route('/')
  .post(godownController.addGodown)
  .patch(godownController.updateGodown);
module.exports = router;

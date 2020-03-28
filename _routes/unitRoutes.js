const express = require('express');
const unitController = require('../_controllers/unitController');

const router = express.Router();

router.get('/name', unitController.getUnitName);

router.get('/name/:id', unitController.getProbableName);

// router
//   .route('/')
//   .post(unitController.addUnit)
//   .patch(unitController.updateUnit);

module.exports = router;

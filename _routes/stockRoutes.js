const express = require('express');
const stockController = require('../_controllers/stockController');

const router = express.Router();

router.post('/', stockController.addStock);

router.post('/shift', stockController.shiftStock);

router.post('/sell', stockController.sellStock);
module.exports = router;

const stock = require('../_model/stockModel');

module.exports.addStock = (req, res) => {
  stock.addStock(req.body.products, message => {
    res.status(200).json({ sent: true, message });
  });
};

module.exports.shiftStock = (req, res) => {
  stock.shiftStock(req, message => {
    res.status(200).json({ sent: true, message });
  });
};

module.exports.sellStock = (req, res) => {
  stock.sellStock(req.body, message => {
    res.status(200).json({ sent: true, message });
  });
};

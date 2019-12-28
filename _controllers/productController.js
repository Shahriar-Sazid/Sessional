const product = require('../_model/productModel');

module.exports.addProducts = (req, res) => {
  const { newProductsList } = req.body;
  for (let i = 0; i < newProductsList.length; i += 1) {
    product.addProduct(newProductsList[i], message => {
      console.log(message);
    });
  }
  res.status(200).json({ sent: true });
};

module.exports.updateProduct = (req, res) => {
  product.updateProduct(req, message => {
    res.status(200).json({ sent: true, message });
  });
};

module.exports.deleteProduct = (req, res) => {
  product.deleteProduct(req, message => {
    res.status(200).json({ sent: true, message });
  });
};

module.exports.shiftProduct = (req, res) => {
  product.shiftProduct(req, message => {
    res.status(200).json({ sent: true, message });
  });
};

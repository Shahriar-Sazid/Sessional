const product = require('../_model/productModel');

module.exports.addProduct = (req, res) => {
  product.addProduct(req.body.product, message => {
    res.status(200).json({ sent: true, message });
  });
};

module.exports.updateProduct = (req, res) => {
  product.updateProduct(req.body.updatedProduct, message => {
    res.status(200).json({ sent: true, message });
  });
};

module.exports.deleteProduct = (req, res) => {
  product.deleteProduct(req, message => {
    res.status(200).json({ sent: true, message });
  });
};

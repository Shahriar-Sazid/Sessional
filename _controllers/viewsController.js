const products = require('./../_model/productModel');

module.exports.getProductPage = (req, res) => {
  products.getAllProduct(productList => {
    res.status(200).render('product.pug', {
      page: 'Stock View',
      products: productList.rows
    });
  });
};

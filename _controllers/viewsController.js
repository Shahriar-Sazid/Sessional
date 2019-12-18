const products = require('./../_model/productModel');
const customers = require('./../_model/customerModel');

module.exports.getProductPage = (req, res) => {
  products.getAllProduct(productList => {
    res.status(200).render('product.pug', {
      page: 'Stock View',
      products: productList.rows
    });
  });
};

module.exports.getCustomerPage = (req, res) => {
  customers.getAllCustomer(customerList => {
    res.status(200).render('customer.pug', {
      page: 'Customer',
      customers: customerList.row
    });
  });
};

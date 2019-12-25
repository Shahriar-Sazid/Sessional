const products = require('../_model/productModel');
const customers = require('../_model/customerModel');
const suppliers = require('../_model/supplierModel');

module.exports.getProductPage = (req, res) => {
  products.getAllProduct(productList => {
    console.log(req.query.mode);
    res.status(200).render('product.pug', {
      page: 'Stock View',
      mode: req.query.mode,
      products: productList.rows
    });
  });
};

module.exports.getCustomerPage = (req, res) => {
  customers.getAllCustomer(customerList => {
    res.status(200).render('customer.pug', {
      page: 'Customer',
      mode: req.query.mode,
      customers: customerList.rows
    });
  });
};

module.exports.getSupplierPage = (req, res) => {
  suppliers.getAllSupplier(supplierList => {
    res.status(200).render('supplier.pug', {
      page: 'Supplier',
      mode: req.query.mode,
      suppliers: supplierList.rows
    });
  });
};

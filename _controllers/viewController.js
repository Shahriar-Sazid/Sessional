const products = require('../_model/productModel');
const customers = require('../_model/customerModel');
const suppliers = require('../_model/supplierModel');
const godowns = require('../_model/godownModel');
const accounts = require('./../_model/accountModel');

module.exports.getProductPage = (req, res) => {
  products.getAllProduct(productList => {
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

module.exports.getGodownPage = (req, res) => {
  godowns.getAllGodown(godownList => {
    res.status(200).render('godown.pug', {
      page: 'Godown',
      mode: req.query.mode,
      godowns: godownList.rows
    });
  });
};

module.exports.getAccountPage = (req, res) => {
  accounts.getAllAccount(accountList => {
    res.status(200).render('account.pug', {
      page: 'Account',
      mode: req.query.mode,
      accounts: accountList.rows
    });
  });
};

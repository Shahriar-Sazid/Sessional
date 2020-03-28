const product = require('../_model/productModel');
const customer = require('../_model/customerModel');
const supplier = require('../_model/supplierModel');
const godown = require('../_model/godownModel');
const account = require('./../_model/accountModel');
const stock = require('./../_model/stockModel');
const invoice = require('./../_model/invoiceModel');
// const memo = require('../_model/memoModel');

module.exports.getProductPage = (req, res) => {
  product.getAllProduct(productList => {
    res.status(200).render('product.pug', {
      page: 'Product',
      products: productList.rows
    });
  });
};

module.exports.getCustomerPage = (req, res) => {
  customer.getAllCustomer(customerList => {
    res.status(200).render('customer.pug', {
      page: 'Customer',
      customers: customerList.rows
    });
  });
};

module.exports.getSupplierPage = (req, res) => {
  supplier.getAllSupplier(supplierList => {
    res.status(200).render('supplier.pug', {
      page: 'Supplier',
      suppliers: supplierList.rows
    });
  });
};

module.exports.getGodownPage = (req, res) => {
  godown.getAllGodown(godownList => {
    res.status(200).render('godown.pug', {
      page: 'Godown',
      godowns: godownList.rows
    });
  });
};

module.exports.getAccountPage = (req, res) => {
  account.getAllAccount(accountList => {
    res.status(200).render('account.pug', {
      page: 'Account',
      accounts: accountList.rows
    });
  });
};

module.exports.getBuyPage = (req, res) => {
  product.getAllProduct(productList => {
    res.status(200).render('buy.pug', {
      page: 'Buy',
      products: productList.rows
    });
  });
};

module.exports.getSellPage = (req, res) => {
  product.getAllProduct(async productList => {
    const stockList = await stock.getAllStock();
    res.status(200).render('sell.pug', {
      page: 'Sell',
      products: productList.rows,
      stock: stockList.rows
    });
  });
};

module.exports.getStockPage = (req, res) => {
  product.getAllProduct(async productList => {
    const stockList = await stock.getAllStock();
    res.status(200).render('stock.pug', {
      page: 'Stock',
      products: productList.rows,
      stock: stockList.rows
    });
  });
};

module.exports.getInvoicePage = (req, res) => {
  invoice.getAllInvoice(invoiceList => {
    res.status(200).render('invoice.pug', {
      page: 'Invoice',
      invoices: invoiceList.rows
    });
  });
};

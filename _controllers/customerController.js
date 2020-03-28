const customer = require('../_model/customerModel');

module.exports.addCustomer = (req, res) => {
  customer.addCustomer(req.body.customer, message => {
    res.status(200).json({ sent: true, message });
  });
};

module.exports.updateCustomer = (req, res) => {
  customer.updateCustomer(req.body.updatedCustomer, message => {
    res.status(200).json({ sent: true, message });
  });
};

module.exports.getCustomerName = (req, res) => {
  customer.getCustomerName(customerNameList => {
    res.status(200).json(customerNameList);
  });
};

module.exports.getCustomerData = (req, res) => {
  customer.getCustomerData(req.query.name, customerData => {
    res.status(200).json(customerData);
  });
};

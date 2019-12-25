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

const invoice = require('./../_model/invoiceModel');

module.exports.getAllInvoice = (req, res) => {
  invoice.getAllInvoice(invoiceNameList => {
    res.status(200).json(invoiceNameList);
  });
};

const supplier = require('./../_model/supplierModel');

module.exports.getSupplierName = (req, res) => {
  supplier.getSupplierName(supplierNameList => {
    res.status(200).json(supplierNameList);
  });
};

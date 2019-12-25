const supplier = require('./../_model/supplierModel');

module.exports.getSupplierName = (req, res) => {
  supplier.getSupplierName(supplierNameList => {
    res.status(200).json(supplierNameList);
  });
};

module.exports.addSupplier = (req, res) => {
  supplier.addSupplier(req.body.supplier, message => {
    res.status(200).json({ sent: true, message });
  });
};

module.exports.updateSupplier = (req, res) => {
  supplier.updateSupplier(req.body.updatedSupplier, message => {
    res.status(200).json({ sent: true, message });
  });
};

const unit = require('./../_model/unitModel');

module.exports.getUnitName = (req, res) => {
  unit.getUnitName(unitNameList => {
    res.status(200).json(unitNameList);
  });
};

module.exports.addUnit = (req, res) => {
  unit.addUnit(req.body.unit, message => {
    res.status(200).json({ sent: true, message });
  });
};

module.exports.updateUnit = (req, res) => {
  unit.updateUnit(req.body.updatedUnit, message => {
    res.status(200).json({ sent: true, message });
  });
};

module.exports.getProbableName = (req, res) => {
  unit.getProbableName(req.params.id, probableUnitList => {
    res.status(200).json(probableUnitList);
  });
};

const godown = require('./../_model/godownModel');

module.exports.getGodownName = (req, res) => {
  godown.getGodownName(godownNameList => {
    res.status(200).json(godownNameList);
  });
};

module.exports.addGodown = (req, res) => {
  godown.addGodown(req.body.godown, message => {
    res.status(200).json({ sent: true, message });
  });
};

module.exports.updateGodown = (req, res) => {
  godown.updateGodown(req.body.updatedGodown, message => {
    res.status(200).json({ sent: true, message });
  });
};

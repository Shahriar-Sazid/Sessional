const godown = require('./../_model/godownModel');

module.exports.getGodownName = (req, res) => {
  godown.getGodownName(godownNameList => {
    res.status(200).json(godownNameList);
  });
};

const account = require('./../_model/accountModel');

module.exports.getAccountName = (req, res) => {
  account.getAccountName(accountNameList => {
    res.status(200).json(accountNameList);
  });
};

module.exports.addAccount = (req, res) => {
  account.addAccount(req.body.account, message => {
    res.status(200).json({ sent: true, message });
  });
};

module.exports.updateAccount = (req, res) => {
  account.updateAccount(req.body.updatedAccount, message => {
    res.status(200).json({ sent: true, message });
  });
};

module.exports.getAccountName = (req, res) => {
  account.getAccountName(accountNameList => {
    res.status(200).json(accountNameList);
  });
};

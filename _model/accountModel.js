const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Shop Database',
  password: 'bolod2347',
  port: 5432
});

client
  .connect()
  .then(() => console.log('Connected to database for account'))
  .catch(e => console.log(e));

module.exports.getAllAccount = async callback => {
  const text = 'select * from account;';
  let accountList;
  try {
    accountList = await client.query(text);
  } catch (err) {
    console.log(err.stack);
  }
  accountList.rows.sort();
  callback(accountList);
};

module.exports.addAccount = async (account, callback) => {
  const query = {
    text: `insert into account 
      (account_name, holder_name, bank, branch, account_no) 
      values ($1,$2,$3,$4,$5);`,
    values: [
      account.account_name,
      account.holder_name,
      account.bank,
      account.branch,
      account.no
    ]
  };
  let message;
  try {
    message = await client.query(query);
  } catch (err) {
    console.log(err.stack);
  }
  callback(message);
};

module.exports.updateAccount = async (account, callback) => {
  const query = {
    text: `update account set account_name = $1, holder_name = $2, bank = $3, branch  = $4, account_no= $5
       where account_name = $6;`,
    values: [
      account.account_name,
      account.holder_name,
      account.bank,
      account.branch,
      account.no,
      account.prevName
    ]
  };
  let message;
  try {
    message = await client.query(query);
  } catch (err) {
    console.log(err.stack);
  }
  callback(message);
};

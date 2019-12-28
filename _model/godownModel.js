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
  .then(() => console.log('Connected to database for godown'))
  .catch(e => console.log(e));

module.exports.getGodownName = async callback => {
  const text = 'select godown_name from godown;';
  let godownNameList;
  try {
    godownNameList = await client.query(text);
  } catch (err) {
    console.log(err.stack);
  }
  callback(godownNameList.rows);
};

module.exports.getAllGodown = async callback => {
  const text = 'select * from godown;';
  let godownList;
  try {
    godownList = await client.query(text);
  } catch (err) {
    console.log(err.stack);
  }
  godownList.rows.sort();
  callback(godownList);
};

module.exports.addGodown = async (godown, callback) => {
  const query = {
    text: `insert into godown (godown_name, address) values ($1,$2);`,
    values: [godown.name, godown.address]
  };
  let message;
  try {
    message = await client.query(query);
  } catch (err) {
    console.log(err.stack);
  }
  callback(message);
};

module.exports.updateGodown = async (godown, callback) => {
  const query = {
    text:
      'update godown set godown_name = $1, address = $2 where godown_name = $3;',
    values: [godown.name, godown.address, godown.prevName]
  };
  let message;
  try {
    message = await client.query(query);
  } catch (err) {
    console.log(err.stack);
  }
  callback(message);
};

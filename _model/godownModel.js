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

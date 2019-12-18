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
  .then(() => console.log('Connected to database for customer'))
  .catch(e => console.log(e));

module.exports.getAllCustomer = async callback => {
  const text = 'select * from customer;';
  let customerList;
  try {
    customerList = await client.query(text);
  } catch (err) {
    console.log(err.stack);
  }
  customerList.rows.sort();
  callback(customerList);
};

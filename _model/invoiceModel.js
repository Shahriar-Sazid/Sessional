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
  .then(() => console.log('Connected to database for invoice'))
  .catch(e => console.log(e));

module.exports.getAllInvoice = async callback => {
  const text = 'select * from memo;';
  let invoiceList;
  try {
    invoiceList = await client.query(text);
  } catch (err) {
    console.log(err.stack);
  }
  //   invoiceList.rows.sort();
  callback(invoiceList);
};

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
  .then(() => console.log('Connected to database for supplier'))
  .catch(e => console.log(e));

module.exports.getSupplierName = async callback => {
  const text = 'select supplier_name from supplier;';
  let supplierNameList;
  try {
    supplierNameList = await client.query(text);
  } catch (err) {
    console.log(err.stack);
  }
  callback(supplierNameList.rows);
};

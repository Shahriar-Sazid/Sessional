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

module.exports.getAllSupplier = async callback => {
  const text = 'select * from supplier;';
  let supplierList;
  try {
    supplierList = await client.query(text);
  } catch (err) {
    console.log(err.stack);
  }
  supplierList.rows.sort();
  callback(supplierList);
};

module.exports.addSupplier = async (supplier, callback) => {
  const query = {
    text: `insert into supplier 
      (supplier_name, company_name, address, mobile_no_1, mobile_no_2, telephone_no, email) 
      values ($1,$2,$3,$4,$5,$6,$7);`,
    values: [
      supplier.name,
      supplier.company,
      supplier.address,
      supplier.mobile1,
      supplier.mobile2,
      supplier.telephone,
      supplier.email
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

module.exports.updateSupplier = async (supplier, callback) => {
  const query = {
    text:
      'update supplier set supplier_name = $1, company_name = $2, address = $3, mobile_no_1 = $4, mobile_no_2 = $5,' +
      ' telephone_no = $6, email = $7 where supplier_name = $8;',
    values: [
      supplier.name,
      supplier.company,
      supplier.address,
      supplier.mobile1,
      supplier.mobile2,
      supplier.telephone,
      supplier.email,
      supplier.prevName
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

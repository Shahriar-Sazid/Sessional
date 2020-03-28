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

module.exports.getCustomerData = async (name, callback) => {
  const text = `select * from customer where customer_name = '${name}'`;
  let customerData;
  try {
    customerData = await client.query(text);
  } catch (err) {
    console.log(err.stack);
  }
  callback(customerData.rows[0]);
};

module.exports.getCustomerName = async callback => {
  const text = 'select customer_name from customer;';
  let customerNameList;
  try {
    customerNameList = await client.query(text);
  } catch (err) {
    console.log(err.stack);
  }
  callback(customerNameList.rows);
};

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

module.exports.addCustomer = async (customer, callback) => {
  const query = {
    text: `insert into customer 
      (customer_name, company_name, address, mobile_no_1, mobile_no_2, telephone_no, email) 
      values ($1,$2,$3,$4,$5,$6,$7);`,
    values: [
      customer.name,
      customer.company,
      customer.address,
      customer.mobile1,
      customer.mobile2,
      customer.telephone,
      customer.email
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

module.exports.updateCustomer = async (customer, callback) => {
  const query = {
    text:
      'update customer set customer_name = $1, company_name = $2, address = $3, mobile_no_1 = $4, mobile_no_2 = $5,' +
      ' telephone_no = $6, email = $7 where customer_name = $8;',
    values: [
      customer.name,
      customer.company,
      customer.address,
      customer.mobile1,
      customer.mobile2,
      customer.telephone,
      customer.email,
      customer.prevName
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

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
  .then(() => console.log('Connected to database for product'))
  .catch(e => console.log(e));

module.exports.getAllProduct = async callback => {
  const text = 'select * from product where deleted=false;';
  let productList;
  try {
    productList = await client.query(text);
  } catch (err) {
    console.log(err.stack);
  }
  productList.rows.sort((a, b) => {
    return a.product_id - b.product_id;
  });
  callback(productList);
};

module.exports.updateProduct = async (req, callback) => {
  const data = req.body;
  const query = {
    text:
      'update product set product_name = $1, type = $2, brand = $3, country = $4, supplier_name = $5, cost = $6, date = $7,' +
      ' place = $8, size = $9, quantity = $10, unit = $11 where product_id = $12;',
    values: [
      data.productName,
      data.productBrand,
      data.productType,
      data.productCountry,
      data.productSupplier,
      data.productCost,
      data.productDate,
      data.productPlace,
      data.productSize,
      data.productQuantity,
      data.productUnit,
      req.params.id
    ]
  };
  let message;
  try {
    message = await client.query(query);
  } catch (err) {
    console.log(err.stack);
    message = err;
  }
  callback(message);
};

module.exports.addProduct = async (data, callback) => {
  const query = {
    text:
      'insert into product (product_name, type, brand, country, supplier_name, cost, date, place, size, quantity, unit, deleted) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, false);',
    values: [
      data.productName,
      data.productBrand,
      data.productType,
      data.productCountry,
      data.productSupplier,
      data.productCost,
      data.productDate,
      data.productPlace,
      data.productSize,
      data.productQuantity,
      data.productUnit
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

module.exports.deleteProduct = async (req, callback) => {
  const query = {
    text: 'update product set deleted=true where product_id = $1;',
    values: [req.params.id]
  };
  let message;
  try {
    message = await client.query(query);
  } catch (err) {
    console.log(err.stack);
    message = err;
  }
  callback(message);
};

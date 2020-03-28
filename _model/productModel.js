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
  const text = 'select * from product;';
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

module.exports.updateProduct = async (product, callback) => {
  const query = {
    text: `update product set name = $1, type = $2, brand = $3, country = $4, 
      size = $5 where product_id = $6;`,
    values: [
      product.name,
      product.type,
      product.brand,
      product.country,
      product.size,
      product.id
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

module.exports.addProduct = async (product, callback) => {
  const query = {
    text:
      'insert into product (name, type, brand, country, size) values ($1,$2,$3,$4,$5);',
    values: [
      product.name,
      product.type,
      product.brand,
      product.country,
      product.size
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
    text: 'delete from product where product_id = $1;',
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

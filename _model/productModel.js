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

module.exports.updateProduct = async (req, callback) => {
  const data = req.body;
  const query = {
    text:
      'update product set product_name = $1, type = $2, brand = $3, country = $4, supplier_name = $5, cost = $6, date = $7,' +
      ' place = $8, size = $9, quantity = $10, unit = $11 where product_id = $12;',
    values: [
      data.productName,
      data.productType,
      data.productBrand,
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
      'insert into product (product_name, type, brand, country, supplier_name, cost, date, place, size, quantity, unit) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);',
    values: [
      data.productName,
      data.type,
      data.brand,
      data.country,
      data.supplierName,
      data.cost,
      data.date,
      data.place,
      data.size,
      data.quantity,
      data.unit
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

module.exports.shiftProduct = (req, callback) => {
  const shiftSingleProduct = async singleData => {
    try {
      await client.query('BEGIN');
      const query1 = {
        text: `select * from product where product_id = $1`,
        values: [singleData.productId]
      };
      const query2 = {
        text:
          'update product set quantity = quantity - $1 where product_id = $2',
        values: [singleData.amount, singleData.productId]
      };
      let data = await client.query(query1);
      data = data.rows[0];
      console.log(data);
      const today = new Date().toISOString().slice(0, 10);

      const query3 = {
        text:
          'insert into product (product_name, type, brand, country, supplier_name, cost, date, place, size, quantity, unit) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);',
        values: [
          data.product_name,
          data.type,
          data.brand,
          data.country,
          data.supplier_name,
          data.cost,
          today,
          singleData.shiftTo,
          data.size,
          singleData.amount,
          data.unit
        ]
      };

      await client.query(query2);
      await client.query(query3);

      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    }
  };
  const data = req.body.shiftData;
  for (let i = 0; i < data.length; i += 1) {
    shiftSingleProduct(data[i]);
  }
  const message = 'success';
  callback(message);
};

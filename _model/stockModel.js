const { Client } = require('pg');
const convert = require('convert-units');
const unitMap = require('../_utilities/unitMap');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Shop Database',
  password: 'bolod2347',
  port: 5432
});

client
  .connect()
  .then(() => console.log('Connected to database for stock'))
  .catch(e => console.log(e));

module.exports.getAllStock = async () => {
  const text = 'select * from stock where quantity>0;';
  let stockList;
  try {
    stockList = await client.query(text);
  } catch (err) {
    console.log(err.stack);
  }
  stockList.rows.sort((a, b) => {
    return a.product_id - b.product_id;
  });
  return stockList;
};

module.exports.addStock = (products, callback) => {
  const messages = [];
  products.forEach(async product => {
    const query = {
      text: `insert into stock (product_id, supplier_name, cost, date, place, 
        quantity, unit) values ($1,$2,$3,$4,$5, $6, $7);`,
      values: [
        product.productId,
        product.supplierName,
        product.cost,
        product.date,
        product.place,
        product.quantity,
        product.unit
      ]
    };
    let message;
    try {
      message = await client.query(query);
      messages.push(message);
    } catch (err) {
      console.log(err.stack);
    }
  });
  callback(messages);
};

module.exports.shiftStock = async (req, callback) => {
  const response = {};
  response.msg = 'success';

  const shiftSingleProduct = async (singleData, i) => {
    try {
      const selectStockQuery = {
        text: `select * from stock where stock_id = $1 and place = $2`,
        values: [singleData.stockId, singleData.shiftFrom]
      };
      const currentStock = (await client.query(selectStockQuery)).rows[0];
      // console.log(singleData);
      if (currentStock.unit !== singleData.shiftStock) {
        singleData.shiftQuantity = convert(singleData.shiftQuantity)
          .from(unitMap.PC2EA[singleData.shiftUnit])
          .to(unitMap.PC2EA[currentStock.unit]);
      }

      if (singleData.shiftQuantity > currentStock.quantity) {
        // await client.query('ROLLBACK');
        throw new Error(
          `Can't move more than available. (Product Serial: ${i + 1})`
        );
      }
      const updateCurrentStockQuery = {
        text:
          'update stock set quantity = quantity - $1 where stock_id = $2 and place = $3',
        values: [
          singleData.shiftQuantity,
          singleData.stockId,
          singleData.shiftFrom
        ]
      };

      const insertStockQuery = {
        text:
          'insert into stock (stock_id, product_id, supplier_name, cost, date, place, quantity, unit) values ($1,$2,$3,$4,$5,$6,$7, $8);',
        values: [
          currentStock.stock_id,
          currentStock.product_id,
          currentStock.supplier_name,
          currentStock.cost,
          currentStock.date,
          singleData.shiftTo,
          singleData.shiftQuantity,
          currentStock.unit
        ]
      };

      const updateStockQuery = {
        text:
          'update stock set quantity = quantity + $1 where stock_id = $2 and place = $3',
        values: [
          singleData.shiftQuantity,
          currentStock.stock_id,
          singleData.shiftTo
        ]
      };

      const checkInsertOrUpdateQuery = {
        text: 'select * from stock where stock_id = $1 and place = $2',
        values: [currentStock.stock_id, singleData.shiftTo]
      };
      await client.query(updateCurrentStockQuery);

      const dataCount = (await client.query(checkInsertOrUpdateQuery)).rows
        .length;

      if (dataCount === 0) {
        await client.query(insertStockQuery);
      } else {
        await client.query(updateStockQuery);
      }
      return true;
    } catch (error) {
      response.msg = 'failed';
      response.detail = error.message;
      // console.log(error.message);
    }
    return false;
  };

  const data = req.body.shiftData;
  let error = false;

  await client.query('BEGIN');
  const shiftResultPromise = [];

  for (let i = 0; i < data.length; i += 1) {
    shiftResultPromise.push(shiftSingleProduct(data[i], i));
  }
  const shiftResult = await Promise.all(shiftResultPromise);
  for (let i = 0; i < shiftResult.length; i += 1) {
    if (shiftResult[i] === false) {
      error = true;
    }
  }

  if (error) {
    await client.query('ROLLBACK');
  } else {
    await client.query('COMMIT');
  }
  callback(response);
};

module.exports.sellStock = async (data, callback) => {
  console.log(data);
  const response = {};
  response.msg = 'success';

  const { soldProduct } = data;
  const invoiceData = data.invoiceMetaData;

  const updateSingleStock = async (product, idx) => {
    try {
      const selectStockQuery = {
        text: 'select * from stock where stock_id = $1 and place = $2',
        values: [product.stock_id, product.place]
      };
      const selectedStock = (await client.query(selectStockQuery)).rows[0];
      // console.log(singleData);
      if (selectedStock.unit !== product.sellingUnit) {
        product.soldQuantity = convert(product.soldQuantity)
          .from(unitMap.PC2EA[product.sellingUnit])
          .to(unitMap.PC2EA[selectedStock.unit]);
        product.sellingUnit = selectedStock.unit;
      }

      if (product.soldQuantity > selectedStock.quantity) {
        throw new Error(
          `Can't sell more than available. (Product Serial: ${idx + 1})`
        );
      }
      const updateStockQuery = {
        text:
          'update stock set quantity = quantity - $1 where stock_id = $2 and place = $3',
        values: [product.soldQuantity, product.stock_id, product.place]
      };
      await client.query(updateStockQuery);
      return true;
    } catch (error) {
      response.msg = 'failed';
      response.detail = error.message;
      return false;
    }
  };

  const insertInvoice = async () => {
    const calculateProfit = () =>
      soldProduct.reduce(
        (totalProfit, product) =>
          totalProfit +
          (product.sellingPrice * product.soldQuantity -
            product.cost * product.soldQuantity),
        0
      );
    const insertInSoldProduct = async (memoId, product) => {
      const insertQuery = {
        text: `insert into sold_product (memo_id,
            stock_id,	
            quantity,	
            unit, 	
            selling_price,
            place) values ($1,$2,$3,$4,$5,$6)`,
        values: [
          memoId,
          product.stock_id,
          product.soldQuantity,
          product.sellingUnit,
          product.sellingPrice,
          product.place
        ]
      };
      await client.query(insertQuery);
    };

    invoiceData.profit = calculateProfit();

    const query = {
      text:
        'insert into memo (date, customer_name, profit) values ($1, $2,$3) returning memo_id',
      values: [invoiceData.date, invoiceData.customerName, invoiceData.profit]
    };
    invoiceData.memoId = (await client.query(query)).rows[0].memo_id;

    for (let i = 0; i < soldProduct.length; i += 1) {
      insertInSoldProduct(invoiceData.memoId, soldProduct[i]);
    }
  };

  let error = false;
  await client.query('BEGIN');
  const soldResultPromise = [];

  for (let i = 0; i < soldProduct.length; i += 1) {
    soldResultPromise.push(updateSingleStock(soldProduct[i], i));
  }

  const soldResult = await Promise.all(soldResultPromise);

  for (let i = 0; i < soldResult.length; i += 1) {
    if (soldResult[i] === false) {
      error = true;
    }
  }
  if (error) {
    await client.query('ROLLBACK');
    console.log('rollback');
  } else {
    insertInvoice();
    console.log(invoiceData);
    console.log('commit');
    await client.query('COMMIT');
  }
  callback(response);
};

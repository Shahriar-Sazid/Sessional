const { Client } = require('pg');
// const path = require('path');
const express = require('express');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Shop Database',
  password: 'bolod2347',
  port: 5432
});

client
  .connect()
  .then(() => console.log('Successfully Connected by the grace of Allah!'))
  .catch(e => console.log(e));

const app = express();
const port = 3002;

app.use(express.static('src'));
app.use('/node_modules', express.static('node_modules'));
app.locals.basedir = 'views';

app.get('/', (req, res) => {
  res.send('Starting by the grace of Allah!');
});

app.get('/product', (req, res) => {
  const text =
    'select * from product inner join supplier on product.supplier_id=supplier.supplier_id;';
  client
    .query(text)
    .then(result => {
      console.log(result.rows[0]);
      res.status(200).render('product.pug', {
        page: 'Stock View',
        products: result.rows
      });
    })
    .catch(e => console.error(e.stack));
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

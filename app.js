const path = require('path');
const express = require('express');
const cors = require('cors');

const viewRouter = require('./_routes/viewRoutes');
const supplierRouter = require('./_routes/supplierRoutes');
const godownRouter = require('./_routes/godownRoutes');
const productRouter = require('./_routes/productRouter');

const clientPug = require('./_utilities/clientPug');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// clientPug.createClientPug(
//   __dirname,
//   '_table.pug',
//   'pugTable.js',
//   'renderTable'
// );

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '_views'));

app.use(express.static(path.join(__dirname, 'src')));
app.use('/node_modules', express.static('node_modules'));
app.locals.basedir = '_views';

app.use('/', viewRouter);
app.use('/api/v1/supplier/', supplierRouter);
app.use('/api/v1/godown/', godownRouter);
app.use('/api/v1/product/', productRouter);
// app.use('/api/v1/customer/', customerRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const path = require('path');
const express = require('express');
const cors = require('cors');

const viewRouter = require('./_routes/viewRoutes');
const supplierRouter = require('./_routes/supplierRoutes');
const godownRouter = require('./_routes/godownRoutes');
const productRouter = require('./_routes/productRouter');
const customerRouter = require('./_routes/customerRoutes');
const accountRouter = require('./_routes/accountRoutes');
const stockRouter = require('./_routes/stockRoutes');
const unitRouter = require('./_routes/unitRoutes');
const invoiceRouter = require('./_routes/invoiceRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// const clientPug = require('./_utilities/clientPug');

// clientPug.createClientPug(
//   __dirname,
//   '_stockTable.pug',
//   'pugStockTable.js',
//   'renderStockTable'
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
app.use('/api/v1/customer/', customerRouter);
app.use('/api/v1/account/', accountRouter);
app.use('/api/v1/stock/', stockRouter);
app.use('/api/v1/unit/', unitRouter);
app.use('/api/v1/invoice/', invoiceRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

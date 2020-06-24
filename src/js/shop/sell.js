/* eslint-disable no-console */
/* eslint-disable no-undef */
/*eslint-env browser*/
const setup = async () => {
  let supplierNames;
  let godownNames;
  let customerNames;
  const supplierOptions = document.querySelector('#stockSupplier');
  const godownOptions = document.querySelector('#stockPlace');
  const customerOptions = document.querySelector('#customerSelect');
  const accountOptions = document.querySelector('#accountSelect');
  const invoiceDateInput = $('#invoiceDateInput');
  const selectProductDiv = $('#selectProductDiv');
  const printInvoiceButton = $('#printInvoiceButton');
  const searchTable = $('#searchTable');
  const errorSelling = $('#errorSelling');
  const prevInvoiceButton = $('#prevInvoiceButton');
  errorSelling.hide();

  prevInvoiceButton.click(function() {
    window.location.assign('http://127.0.0.1:3000/invoice');
  });

  const invoiceTableContainer = $('#invoiceTableContainer');
  const grandTotalContainer = $('#grandTotalContainer');

  printInvoiceButton.hide();
  invoiceTableContainer.hide();
  grandTotalContainer.hide();
  searchTable.hide();

  selectProductDiv.hide(200);

  const date = moment()
    .format()
    .slice(0, 10);
  invoiceDateInput.val(date);
  const invoiceDate = $('#invoiceDate');
  invoiceDate.html(`Date: ${invoiceDateInput.val()}`);
  const productInfoForm = $('#productInfoForm');
  productInfoForm.hide(200);

  if (accountOptions.childElementCount === 0) {
    try {
      const axiosRes = await axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/api/v1/account/name',
        responseType: 'json'
      });
      accountNames = axiosRes.data;
    } catch (error) {
      console.log(error.stack);
    }

    for (let i = 0; i < accountNames.length; i += 1) {
      const option = document.createElement('option');
      option.text = accountNames[i].account_name;
      accountOptions.add(option);
    }
    const freeOption = document.createElement('option');
    freeOption.text = 'Given by Customer';
    accountOptions.add(freeOption);
    accountOptions.value = 'Given by Customer';
  }

  if (customerOptions.childElementCount === 0) {
    try {
      const axiosRes = await axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/api/v1/customer/name',
        responseType: 'json'
      });
      customerNames = axiosRes.data;
    } catch (error) {
      console.log(error.stack);
    }

    for (let i = 0; i < customerNames.length; i += 1) {
      const option = document.createElement('option');
      option.text = customerNames[i].customer_name;
      customerOptions.add(option);
    }
  }

  if (supplierOptions.childElementCount === 0) {
    try {
      const axiosRes = await axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/api/v1/supplier/name',
        responseType: 'json'
      });
      supplierNames = axiosRes.data;
    } catch (error) {
      console.log(error.stack);
    }

    for (let i = 0; i < supplierNames.length; i += 1) {
      const option = document.createElement('option');
      option.text = supplierNames[i].supplier_name;
      supplierOptions.add(option);
    }
  }

  if (godownOptions.childElementCount === 0) {
    try {
      const axiosRes = await axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/api/v1/godown/name',
        responseType: 'json'
      });
      godownNames = axiosRes.data;
    } catch (error) {
      console.log(error.stack);
    }

    for (let i = 0; i < godownNames.length; i += 1) {
      const option = document.createElement('option');
      option.text = godownNames[i].godown_name;
      godownOptions.add(option);
    }
  }

  supplierOptions.value = '';
  godownOptions.value = '';
  customerOptions.value = '';
};

const sellProduct = () => {
  const customerInput = $('#customerSelect');
  const customerName = $('#customerName');
  const customerShop = $('#customerShop');
  const customerAddress = $('#customerAddress');
  const customerMobile = $('#customerMobile');

  const previousBalance = $('#previousBalance');

  const invoiceDateInput = $('#invoiceDateInput');
  const invoiceDate = $('#invoiceDate');

  const printInvoiceButton = $('#printInvoiceButton');

  const invoiceBuilder = $('#invoiceBuilder');
  const invoiceHeaderForm = $('#invoiceHeaderForm');
  //const sellingExpense = $('#sellingExpense');
  const doneButton = $('#finalizeInvoiceButton');
  const selectProductDiv = $('#selectProductDiv');
  const grandTotal = $('#grandTotal');
  const invoiceTableContainer = $('#invoiceTableContainer');
  const grandTotalContainer = $('#grandTotalContainer');
  const errorSelling = $('#errorSelling');

  const selectedProducts = [];
  selectedProducts.push = item => {
    Array.prototype.push.call(selectedProducts, item);
    if (selectedProducts.length > 0) {
      doneButton.attr('disabled', false);
      invoiceTableContainer.show('slow');
      grandTotalContainer.show('slow');
    }
  };

  selectedProducts.splice = item => {
    const idx = selectedProducts.findIndex(
      stock => item.stock_id === stock.stock_id && item.place === stock.place
    );
    const res = Array.prototype.splice.call(selectedProducts, idx, 1);
    if (res !== []) {
      if (selectedProducts.length === 0) {
        doneButton.attr('disabled', true);
        invoiceTableContainer.hide('slow');
        grandTotalContainer.hide('slow');
      }
    }
    return res;
  };

  invoiceDateInput.on('input', function() {
    invoiceDate.html(`Date: ${invoiceDateInput.val()}`);
  });

  customerInput.on('input', async function(e) {
    e.preventDefault();

    selectProductDiv.show(300);

    let customer;
    try {
      const axiosRes = await axios({
        method: 'get',
        url: `http://127.0.0.1:3000/api/v1/customer?name=${customerInput.val()}`,
        responseType: 'json'
      });
      customer = axiosRes.data;
    } catch (error) {
      console.log(error.stack);
    }

    previousBalance.val(customer.balance);
    customerName.html(customer.customer_name);
    customerShop.html(customer.company_name);
    customerAddress.html(customer.address);

    const mob2 = `, ${customer.mobile_no_2}`;

    customerMobile.html(
      `${customer.mobile_no_1} ${
        customer.mobile_no_2 === null || customer.mobile_no_2 === '' ? '' : mob2
      }`
    );
  });

  const selectProduct = () => {
    const searchTable = $('#searchTable');
    const invoiceTable = $('#invoiceTable');

    const searchName = $('#searchName');
    const searchType = $('#searchType');
    const searchSize = $('#searchSize');

    const productInfoForm = $('#productInfoForm');

    let nameResult;
    let typeResult;
    let sizeResult;

    let selectedStock;

    const insertRowToSearchTable = (stock, product) => {
      if (stock.locked === undefined) {
        const row = `<tr>
        <td><button class='soldProductSelect btn btn-light' data-stockid=${stock.stock_id} data-place='${stock.place}'type='button'><i class='fa fa-exchange'></i></button></td>
        <td>${product.name}</td>
        <td>${product.type}</td>
        <td>${product.brand}</td>
        <td>${product.country}</td>
        <td>${stock.supplier_name}</td>
        <td>${product.size}</td>
        <td>${stock.quantity} ${stock.unit}</td>
        <td>${stock.cost}</td></tr>`;
        searchTable.find('tbody').append(row);
      }
    };

    searchName.on('input', e => {
      e.preventDefault();
      if (searchName.val().length > 2) {
        searchType.prop('disabled', false);
        searchSize.prop('disabled', false);
      } else {
        searchType.prop('disabled', true);
        searchSize.prop('disabled', true);
      }
    });

    searchName.on('focusout', e => {
      e.preventDefault();

      const options = {
        keys: ['name'],
        threshold: 0.1
      };
      const fuse = new Fuse(products, options);
      nameResult = fuse.search(searchName.val());
      searchTable.find('tbody').empty();
      if (nameResult.length >= 1) {
        searchTable.show(300);
        nameResult.forEach(pr => {
          stock.forEach(st => {
            if (
              st.product_id === pr.product_id &&
              st.place === 'Sales Center'
            ) {
              insertRowToSearchTable(st, pr);
              productInfoForm.hide(200);
            }
          });
        });
      }
    });

    searchType.on('focusout', e => {
      e.preventDefault();

      const options = {
        keys: ['type', 'brand'],
        threshold: 0.5
      };
      const fuse = new Fuse(nameResult, options);

      if (searchType.val().length > 0) {
        typeResult = fuse.search(searchType.val());
        searchTable.find('tbody').empty();

        if (typeResult.length >= 1) {
          searchTable.show(300);
          typeResult.forEach(pr => {
            stock.forEach(st => {
              if (st.product_id === pr.product_id) {
                insertRowToSearchTable(st, pr);
                productInfoForm.hide(200);
              }
            });
          });
        }
      } else {
        typeResult = nameResult;
      }
    });

    searchSize.on('focusout', e => {
      e.preventDefault();

      const options = {
        keys: ['size'],
        threshold: 0.45
      };
      const fuse = new Fuse(typeResult, options);

      if (searchSize.val().length > 0) {
        sizeResult = fuse.search(searchSize.val());
        searchTable.find('tbody').empty();

        if (sizeResult.length >= 1) {
          searchTable.show(300);
          sizeResult.forEach(pr => {
            stock.forEach(st => {
              if (st.product_id === pr.product_id) {
                insertRowToSearchTable(st, pr);
                productInfoForm.hide(200);
              }
            });
          });
        }
      } else {
        sizeResult = typeResult;
      }
    });

    $(document).on('click', '.soldProductSelect', function() {
      productInfoForm.show(300);
      errorSelling.hide(200);
      let stockId = this.dataset.stockid;
      stockId = parseInt(stockId, 10);
      const { place } = this.dataset;
      selectedStock = stock.find(
        st => st.stock_id === stockId && st.place === place
      );
      const selectedProduct = products.find(
        pr => selectedStock.product_id === pr.product_id
      );

      const removeSelectedRow = () => {
        $(this)
          .parent()
          .parent()
          .remove();
      };

      removeSelectedRow();

      selectedStock = Object.assign(selectedStock, selectedProduct);

      $('#productName').val(selectedProduct.name);
      $('#productType').val(selectedProduct.type);
      $('#productBrand').val(selectedProduct.brand);
      $('#productCountry').val(selectedProduct.country);
      $('#productSize').val(selectedProduct.size);

      $('#stockSupplier').val(selectedStock.supplier_name);
      $('#stockCost').val(selectedStock.cost);
      $('#stockDate').val(selectedStock.date.slice(0, 10));
      $('#stockPlace').val(selectedStock.place);
      $('#availableQuantity').val(
        `${selectedStock.quantity} ${selectedStock.unit}`
      );
      const unitOption = document.querySelector('#sellingUnit');
      const setProbableUnit = async unitOptions => {
        let unitNames;
        if (unitOptions.childElementCount === 0) {
          try {
            const axiosRes = await axios({
              method: 'get',
              url: `http://127.0.0.1:3000/api/v1/unit/name/${selectedStock.unit}`,
              responseType: 'json'
            });
            unitNames = axiosRes.data;
          } catch (err) {
            console.log(err.stack);
          }
          for (let i = 0; i < unitNames.length; i += 1) {
            const option = document.createElement('option');
            option.text = unitNames[i];
            unitOptions.add(option);
          }
        }
        unitOption.value = '';
      };
      setProbableUnit(unitOption);
      searchType.val('');
      searchSize.val('');
      if (searchTable.find('tr').length === 1) {
        searchTable.hide('slow');
      }
    });

    productInfoForm.on('submit', function(e) {
      const insertRowToInvoiceTable = stock => {
        const row = `<tr>
          <td><button class='removeSoldProduct btn btn-light' data-stockid=${
            stock.stock_id
          } data-place = ${
          stock.place
        } type='button'><i class='fa fa-times'></i></button></td>
          <td>${stock.name}</td>
          <td>${stock.type}</td>
          <td>${stock.brand}</td>
          <td>${stock.size}</td>
          <td>${stock.soldQuantity} ${stock.unit}</td>
          <td>${stock.sellingPrice}</td>
          <td>${stock.sellingPrice * stock.soldQuantity}</td></tr>`;
        invoiceTable
          .find('tbody')
          .append(row)
          .hide()
          .show(500);
      };
      e.preventDefault();

      const soldQuantity = $('#soldQuantity');
      const sellingPrice = $('#sellingPrice');
      const sellingUnit = $('#sellingUnit');

      selectedStock.sellingPrice = parseFloat(sellingPrice.val());
      selectedStock.soldQuantity = parseFloat(soldQuantity.val());
      selectedStock.totalPrice =
        selectedStock.sellingPrice * selectedStock.soldQuantity;
      selectedStock.sellingUnit = sellingUnit.val();

      insertRowToInvoiceTable(selectedStock);
      grandTotal.html(
        `${String(
          parseInt(grandTotal.html(), 10) + selectedStock.totalPrice
        )} taka`
      );

      stock.find(
        st =>
          st.stock_id === selectedStock.stock_id &&
          st.place === selectedStock.place
      ).locked = true;
      selectedProducts.push(selectedStock);
      selectedStock = {};

      sellingPrice.val('');
      soldQuantity.val('');
      productInfoForm.hide(200);
    });
  };

  $(document).on('click', '.removeSoldProduct', function() {
    let stockId = this.dataset.stockid;
    stockId = parseInt(stockId, 10);
    const { place } = this.dataset;
    const notSoldProduct = selectedProducts.find(
      stock => stock.stock_id === stockId && stock.place === place
    );

    notSoldProduct.locked = undefined;

    grandTotal.html(
      `${String(
        parseInt(grandTotal.html(), 10) - notSoldProduct.totalPrice
      )} taka`
    );

    selectedProducts.splice(notSoldProduct);
    const removeSelectedRow = () => {
      $(this)
        .parent()
        .parent()
        .remove();
    };

    removeSelectedRow();
  });

  const printInvoice = () => {
    printInvoiceButton.click(e => {
      e.preventDefault();
      const selectedProductsForPrint = [...selectedProducts];

      selectedProductsForPrint.push({
        totalPrice: grandTotal.html(),
        sellingPrice: 'Total: ',
        name: '',
        type: '',
        brand: '',
        size: '',
        soldQuantity: ''
      });
      printJS({
        printable: selectedProductsForPrint,
        type: 'json',
        properties: [
          { field: 'name', displayName: 'NAME' },
          { field: 'type', displayName: 'TYPE' },
          { field: 'brand', displayName: 'BRAND' },
          { field: 'size', displayName: 'SIZE' },
          { field: 'soldQuantity', displayName: 'QUANTITY' },
          { field: 'sellingPrice', displayName: 'PRICE/UNIT' },
          { field: 'totalPrice', displayName: 'TOTAL' }
        ],
        header: `<div>
                  <div class = 'invoice-header'>
                    <div class = 'invoice-header-left'>
                      <img src="img/brand/final-logo-png.png" id = 'invoice-logo' alt="Abdullah Tools Logo" />
                      <hr />
                      <p>Invoice #550</p>
                      <p>Date: ${invoiceDate.html()} </p>
                    </div>
                    <div class = 'invoice-header-right'>
                      <p> <strong>Customer Information </strong> </p>
                      <p id="customerName"> ${customerName.html()}</p>
                      <p id="customerShop"> ${customerShop.html()}</p>
                      <p id="customerAddress"> ${customerAddress.html()}</p>
                      <p id="customerMobile"> ${customerMobile.html()}</p>
                    </div>
                  </div>
                  <hr id = 'divider'/>
                </div> 
                `,
        style: `#divider{
                  margin-top: 10px;
                  margin-bottom: 50px;
                }
                .invoice-header {
                  display: flex;
                }
                .invoice-header-left > p {
                  margin: 1px;
                  flex-grow: 1;
                  font-weight: bold;
                }
                .invoice-header-right {
                  flex-grow: 1;
                 }
                .invoice-header-right > p {
                  text-align: right;
                  margin: 1px;
                }
                .invoice-header-right > p:first-child {
                  margin-bottom: 8px;
                }`,
        repeatTableHeader: true,
        gridStyle: `border-top: 1px solid lightgray;
                    border-bottom: 1px solid lightgray;
                    text-align: center;
                    height: 30px;`,
        gridHeaderStyle: `border-top: 1px solid lightgray;
                          border-bottom: 1px solid lightgray;
                          text-align: center;
                          height: 30px;`
      });
    });
  };

  invoiceHeaderForm.on('submit', async function(e) {
    e.preventDefault();
    const soldProduct = [];
    for (let i = 0; i < selectedProducts.length; i += 1) {
      const singleSoldProduct = {};
      singleSoldProduct.stock_id = selectedProducts[i].stock_id;
      singleSoldProduct.place = selectedProducts[i].place;
      singleSoldProduct.soldQuantity = selectedProducts[i].soldQuantity;
      singleSoldProduct.sellingPrice = selectedProducts[i].sellingPrice;
      singleSoldProduct.cost = selectedProducts[i].cost;
      singleSoldProduct.sellingUnit = selectedProducts[i].sellingUnit;
      soldProduct.push(singleSoldProduct);
    }
    const invoiceMetaData = {
      customerName: customerInput.val(),
      date: invoiceDateInput.val()
    };
    let response = null;
    try {
      const axiosRes = await axios({
        method: 'post',
        url: 'http://127.0.0.1:3000/api/v1/stock/sell',
        responseType: 'json',
        data: {
          soldProduct,
          invoiceMetaData
        }
      });
      response = axiosRes.data.message;
    } catch (error) {
      console.log(error.stack);
    }
    if (response.msg === 'success') {
      console.log(response);
      invoiceBuilder.fadeOut();
      printInvoiceButton.show('slow');
      // window.location.reload(true);
    } else if (response.msg === 'failed') {
      console.log(response);
      errorSelling.html(response.detail);
      errorSelling.show();
    }
  });

  printInvoice();
  selectProduct();
};

setup();
sellProduct();

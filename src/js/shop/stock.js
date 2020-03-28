/* eslint-disable no-console */
/* eslint-disable no-undef */
/*eslint-env browser*/

const setupMode = () => {
  const shiftStockButton = $('#viewShiftStockButton');
  const stockView = $('#stockView');
  const shiftView = $('#shiftView');
  shiftStockButton.click(function() {
    if (
      $(this)
        .children('i')
        .html() === 'Shift Stock'
    ) {
      stockView.hide();
      shiftView.show();
      shiftStockButton.children('i').html('View Stock');
    } else {
      shiftView.hide();
      stockView.show();
      shiftStockButton.children('i').html('Shift Stock');
    }
  });
};

const shiftStock = () => {
  const searchTable = $('#shiftStockSearchTable');
  const shiftableStockTable = $('#shiftableStockTable');

  let shiftableStockList = [];

  const searchName = $('#shiftStockSearchName');
  const searchType = $('#shiftStockSearchType');
  const searchSize = $('#shiftStockSearchSize');

  const selectedStockForShift = $('#selectedStockForShift');
  const shiftTo = $('#shiftTo');
  const shiftFrom = $('#shiftFrom');
  const shiftingUnit = $('#shiftingUnit');
  const availableAmount = $('#availableAmount');

  const shiftStockButton = $('#shiftStockButton');

  let nameResult;
  let typeResult;
  let sizeResult;

  const errorShifting = $('#errorShifting');

  let shiftableStock;

  searchTable.hide();

  const printShiftableStockTable = () => {
    const printTableButton = $('#printShiftableTableButton');
    printTableButton.click(e => {
      e.preventDefault();
      printJS({
        printable: 'shiftableStockTableDiv',
        type: 'html',
        style: `#shiftableStockTable tr td:nth-child(1), #shiftableStockTable th:nth-child(1) {
              display: none;
            } 
              #shiftableStockTable {
                font-size: 12px; 
                border-collapse: collapse;
              } 
              th, td {
                border: 1px solid orange;
                padding: 10px;
                text-align: left;
              } 
              #printShiftableTableButton {
                display:none;
              }`
      });
    });
  };
  const insertRowToSearchTable = (stock, product) => {
    if (stock.locked === undefined) {
      const row = `<tr>
        <td><button class='shiftStockSelect btn btn-light' 
        data-stockid=${stock.stock_id} data-place=${stock.place} type='button'>
      <i class='fa fa-exchange'></i></button></td>
        <td>${product.name}</td>
        <td>${product.type}</td>
        <td>${product.brand}</td>
        <td>${product.country}</td>
        <td>${stock.supplier_name}</td>
        <td>${product.size}</td>
        <td>${stock.quantity.toFixed(2)} ${stock.unit}</td>
        <td>${stock.place}</td>
        <td>${stock.cost}</td></tr>`;
      searchTable.find('tbody').append(row);
    }
  };

  const insertRowToShiftableTable = (stock, product) => {
    const row = `<tr>
      <td><button class='removeShiftableStock btn btn-light' data-stockid = ${stock.stock_id} type='button'><i class='fa fa-close'></i></button></td>
      <td>${product.name}</td>
      <td>${product.type}</td>
      <td>${product.brand}</td>
      <td>${product.country}</td>
      <td>${stock.supplier_name}</td>
      <td>${product.size}</td>
      <td>${stock.quantity} ${stock.unit}</td>
      <td>${stock.moveQuantity} ${stock.shiftUnit}</td>
      <td>${stock.place}</td>
      <td>${stock.shiftTo}</td></tr>`;
    shiftableStockTable.find('tbody').append(row);
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
      searchTable.show();
      nameResult.forEach(pr => {
        stock.forEach(st => {
          if (st.product_id === pr.product_id) {
            insertRowToSearchTable(st, pr);
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
        console.log(typeResult);
        typeResult.forEach(pr => {
          stock.forEach(st => {
            if (st.product_id === pr.product_id) {
              insertRowToSearchTable(st, pr);
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
        console.log(sizeResult);
        sizeResult.forEach(pr => {
          stock.forEach(st => {
            if (st.product_id === pr.product_id) {
              insertRowToSearchTable(st, pr);
            }
          });
        });
      }
    } else {
      sizeResult = typeResult;
    }
  });

  const setupGodown = async () => {
    let godownNames;
    const shiftToOptions = document.querySelector('#shiftTo');

    if (shiftToOptions.childElementCount === 0) {
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
        shiftToOptions.add(option);
      }
    }

    shiftToOptions.value = '';
  };

  $(document).on('click', '.shiftStockSelect', function() {
    let stockId = this.dataset.stockid;
    stockId = parseInt(stockId, 10);
    const { place } = this.dataset;
    shiftableStock = stock.find(
      stock => stock.stock_id === stockId && stock.place === place
    );
    const selectedProduct = products.find(
      pr => shiftableStock.product_id === pr.product_id
    );

    const setProbableUnit = async (unitOptions, unit) => {
      let unitNames;
      if (unitOptions.childElementCount === 0) {
        try {
          const axiosRes = await axios({
            method: 'get',
            url: `http://127.0.0.1:3000/api/v1/unit/name/${unit}`,
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
      unitOptions.value = '';
    };

    const removeSelectedRow = () => {
      $(this)
        .parent()
        .parent()
        .remove();
    };

    removeSelectedRow();

    selectedStockForShift.val(selectedProduct.name);
    shiftFrom.val(shiftableStock.place);

    availableAmount.val(`${shiftableStock.quantity} ${shiftableStock.unit}`);
    const unitOption = document.querySelector('#shiftingUnit');
    setProbableUnit(unitOption, shiftableStock.unit);

    searchType.val('');
    searchSize.val('');
  });

  $(document).on('click', '.removeShiftableStock', function() {
    let stockId = this.dataset.stockid;
    stockId = parseInt(stockId, 10);
    console.log(stockId);
    const unshiftableStock = stock.find(stock => stock.stock_id === stockId);

    unshiftableStock.locked = undefined;

    shiftableStockList = shiftableStockList.filter(stock => {
      return stock.stock_id !== unshiftableStock.stock_id;
    });

    const removeSelectedRow = () => {
      $(this)
        .parent()
        .parent()
        .remove();
    };

    removeSelectedRow();
  });

  $('#shiftableStockInfoForm').on('submit', e => {
    e.preventDefault();

    // parseInt(moveAmount.val(), 10) <= shiftableStock.quantity &&
    const moveAmount = $('#moveAmount');
    if (selectedStockForShift.val() === '') {
      errorShifting.html('Please select a product to shift!');
      errorShifting.show();
    } else if (shiftFrom.val() !== shiftTo.val()) {
      errorShifting.hide();

      shiftableStock.locked = true;
      shiftableStock.moveQuantity = parseInt(moveAmount.val(), 10);
      shiftableStock.shiftTo = shiftTo.val();
      shiftableStock.shiftUnit = shiftingUnit.val();
      const selectedShiftableProduct = products.find(
        pr => pr.product_id === shiftableStock.product_id
      );
      insertRowToShiftableTable(shiftableStock, selectedShiftableProduct);

      shiftableStockList.push(shiftableStock);

      selectedStockForShift.val('');
      shiftTo.val('');
      shiftFrom.val('');
      availableAmount.val('');
      moveAmount.val('');
    } else {
      if (shiftFrom.val() === shiftTo.val()) {
        errorShifting.html('Can not shift to same godown!');
      }
      // else if (parseInt(moveAmount.val(), 10) > shiftableStock.quantity) {
      //   error.html('Can not move more than available!');
      // }
      errorShifting.show();
    }
  });

  shiftStockButton.on('click', async e => {
    e.preventDefault();
    const shiftData = [];
    for (let i = 0; i < shiftableStockList.length; i += 1) {
      const singleShiftData = {};
      singleShiftData.stockId = shiftableStockList[i].stock_id;
      singleShiftData.shiftQuantity = shiftableStockList[i].moveQuantity;
      singleShiftData.shiftTo = shiftableStockList[i].shiftTo;
      singleShiftData.shiftFrom = shiftableStockList[i].place;
      singleShiftData.shiftUnit = shiftableStockList[i].shiftUnit;
      console.log(singleShiftData);
      shiftData.push(singleShiftData);
    }
    let response = null;
    try {
      const axiosRes = await axios({
        method: 'post',
        url: `http://127.0.0.1:3000/api/v1/stock/shift`,
        responseType: 'json',
        data: {
          shiftData
        }
      });
      response = axiosRes.data.message;
    } catch (error) {
      console.log(error.stack);
    }
    if (response.msg === 'success') {
      window.location.reload(true);
    } else if (response.msg === 'failed') {
      console.log(response);
      errorShifting.html(response.detail);
      errorShifting.show();
    }
  });

  printShiftableStockTable();
  setupGodown();
};

const searchStock = () => {
  const searchFunction = () => {
    const options1 = {
      keys: [],
      threshold: 0.2
    };
    const options2 = Object.create(options1, {});
    const fuse1 = new Fuse(products, options1);
    const fuse2 = new Fuse(stock, options2);
    const searchBy = document.querySelector('#searchBy');
    const searchProductInput = document.querySelector('#searchStockInput');
    let searchResult = [];

    if (searchProductInput.value === '') {
      searchResult = stock;
    } else if (searchBy.value === 'Name') {
      options1.keys.push('name');
      fuse1.search(searchProductInput.value).forEach(pr => {
        stock.forEach(st => {
          if (st.product_id === pr.product_id) {
            searchResult.push(st);
          }
        });
      });
    } else if (searchBy.value === 'Brand') {
      options1.keys.push('brand');
      fuse1.search(searchProductInput.value).forEach(pr => {
        stock.forEach(st => {
          if (st.product_id === pr.product_id) {
            searchResult.push(st);
          }
        });
      });
    } else if (searchBy.value === 'Country') {
      options1.keys.push('country');
      fuse1.search(searchProductInput.value).forEach(pr => {
        stock.forEach(st => {
          if (st.product_id === pr.product_id) {
            searchResult.push(st);
          }
        });
      });
    } else if (searchBy.value === 'Supplier') {
      options2.keys[0] = 'supplier_name';
      searchResult = fuse2.search(searchProductInput.value);
    } else if (searchBy.value === 'Place') {
      options2.keys[0] = 'place';
      searchResult = fuse2.search(searchProductInput.value);
    }
    const productTable = document.querySelector('#stockTable');
    const html = window.renderStockTable({ stock: searchResult });
    const div = document.createElement('div');
    div.innerHTML = html;
    const parentOfTable = productTable.parentElement;
    parentOfTable.replaceChild(div.firstChild, productTable);
  };
  document.querySelector('#searchStockButton').addEventListener('click', e => {
    e.preventDefault();
    searchFunction();
  });
  $('#searchStockInput').on('keypress', e => {
    if (e.which === 13) {
      e.preventDefault();
      searchFunction();
    }
  });
};

const printStockTable = () => {
  const printTableButton = document.querySelector('#printTableButton');
  printTableButton.addEventListener('click', e => {
    e.preventDefault();
    printJS({
      printable: 'tableDiv',
      type: 'html',
      style: `#stockTable tr td:nth-child(1), #stockTable th:nth-child(1) {
          display: none
        } 
        #stockTable {
          font-size: 12px; 
          border-collapse: collapse
        } 
        th, td {
          border: 1px solid orange;
          padding: 10px; 
          text-align: left
        } 
        #printTableButton {
          display:none
        }`
    });
  });
};

setupMode();
shiftStock();
searchStock();
printStockTable();

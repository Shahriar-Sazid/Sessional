/* eslint-disable no-console */
/* eslint-disable no-undef */
/*eslint-env browser*/

const setupMode = () => {
  const stockView = $('#stockView');
  const shiftView = $('#shiftView');
  const addView = $('#addView');
  if (mode === 'view') {
    shiftView.hide();
    addView.hide();
    stockView.show();
  } else if (mode === 'add') {
    stockView.hide();
    shiftView.hide();
    addView.show();
  } else {
    stockView.hide();
    addView.hide();
    shiftView.show();
  }
};

const setupSupplierAndGodown = async () => {
  let supplierNames;
  let godownNames;
  const supplierOptions = document.getElementById('supplier_select');
  const godownOptions = document.getElementById('product_place_select');
  const shiftFromOptions = document.querySelector('#shiftFrom');
  const shiftToOptions = document.querySelector('#shiftTo');
  const newSupplierOptions = document.querySelector('#newSupplierSelect');
  const newGodownOptions = document.querySelector('#newProductPlaceSelect');

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

    for (let i = 0; i < supplierNames.length; i += 1) {
      const option = document.createElement('option');
      option.text = supplierNames[i].supplier_name;
      newSupplierOptions.add(option);
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

    for (let i = 0; i < godownNames.length; i += 1) {
      const option = document.createElement('option');
      option.text = godownNames[i].godown_name;
      newGodownOptions.add(option);
    }

    for (let i = 0; i < godownNames.length; i += 1) {
      const option = document.createElement('option');
      option.text = godownNames[i].godown_name;
      shiftToOptions.add(option);
    }

    for (let i = 0; i < godownNames.length; i += 1) {
      const option = document.createElement('option');
      option.text = godownNames[i].godown_name;
      shiftFromOptions.add(option);
    }
  }

  supplierOptions.value = '';
  godownOptions.value = '';
  shiftFromOptions.value = '';
  shiftToOptions.value = '';
  newSupplierOptions.value = '';
  newGodownOptions.value = '';
};

const addProduct = () => {
  const newProductForm = $('#newProductForm');
  const addProductForm = $('#addProductForm');

  const newProductsTable = $('#newProductsTable');
  const newProductsList = [];

  const insertRowToNewProductTable = product => {
    const row = `<tr>
    <td><button class='removeNewProduct btn btn-light' type='button'><i class='fa fa-close'></i></button></td>
    <td>${product.productName}</td>
    <td>${product.type}</td>
    <td>${product.brand}</td>
    <td>${product.country}</td>
    <td>${product.supplierName}</td>
    <td>${product.size}</td>
    <td>${product.quantity} ${product.unit}</td>
    <td>${product.cost}</td>
    <td>${product.place}</td>
    <td>${product.date}</td></tr>`;

    newProductsTable.find('tbody').append(row);
  };

  const printNewProductsTable = () => {
    const printTableButton = $('#printNewProductsTableButton');
    printTableButton.click(e => {
      e.preventDefault();
      printJS({
        printable: 'newProductsTableDiv',
        type: 'html',
        style: `#newProductsTable tr td:nth-child(1), #newProductsTable th:nth-child(1) {
          display: none
        } 
          #newProductsTable {
            font-size: 12px; 
            border-collapse: collapse
          } 
          th, td {
            border: 1px solid orange;
            padding: 10px; text-align: left
          } 
          #printNewProductsTableButton {
            display:none
          }`
      });
    });
  };

  $(document).on('click', '.removeNewProduct', function() {
    const row = $(this)
      .parent()
      .parent();

    newProductsList.splice(row.index(), 1);
    row.remove();
  });

  newProductForm.on('submit', e => {
    e.preventDefault();
    const product = {};

    product.productName = $('#newProductName').val();
    product.type = $('#newProductType').val();
    product.brand = $('#newProductBrand').val();
    product.country = $('#newProductCountry').val();
    product.supplierName = $('#newSupplierSelect').val();
    product.cost = $('#newProductCost').val();
    product.date = $('#newProductDate').val();
    product.place = $('#newProductPlaceSelect').val();
    product.size = $('#newProductSize').val();
    product.quantity = $('#newProductQuantity').val();
    product.unit = $('#newProductUnit').val();

    newProductsList.push(product);

    insertRowToNewProductTable(product);
  });

  addProductForm.on('submit', async e => {
    e.preventDefault();
    if (newProductsList.length !== 0) {
      try {
        const axiosRes = await axios({
          method: 'post',
          url: 'http://127.0.0.1:3000/api/v1/stock/',
          responseType: 'json',
          data: {
            products: newProductsList
          }
        });
        message = axiosRes;
        console.log(message);
      } catch (error) {
        console.log(error.stack);
      }
      window.location.reload(true);
    }
  });
  printNewProductsTable();
};

const updateProduct = () => {
  const clearForm = function() {
    document.getElementById('product_name').value = '';
    document.getElementById('product_type').value = '';
    document.getElementById('product_brand').value = '';
    document.getElementById('product_country').value = '';
    document.getElementById('supplier_select').value = '';
    document.getElementById('product_cost').value = '';
    document.getElementById('product_date').value = '';
    document.getElementById('product_place_select').value = '';
    document.getElementById('product_size').value = '';
    document.getElementById('product_quantity').value = '';
    document.getElementById('product_unit').value = '';
  };

  const fillForm = function(btn, productList) {
    const productId = parseInt(btn.dataset.product_id, 10);

    const productIndex = productList.findIndex(
      elem => elem.product_id === productId
    );

    const updateButton = document.querySelector('#updateProductButton');

    updateButton.dataset.product_id = productId;

    document.getElementById('product_name').value =
      productList[productIndex].product_name;
    document.getElementById('product_type').value =
      productList[productIndex].type;
    document.getElementById('product_brand').value =
      productList[productIndex].brand;
    document.getElementById('product_country').value =
      productList[productIndex].country;
    document.getElementById('supplier_select').value =
      productList[productIndex].supplier_name;
    document.getElementById('product_cost').value =
      productList[productIndex].cost;
    document.getElementById('product_date').value = productList[
      productIndex
    ].date.slice(0, 10);
    document.getElementById('product_place_select').value =
      productList[productIndex].place;
    document.getElementById('product_size').value =
      productList[productIndex].size;
    document.getElementById('product_quantity').value =
      productList[productIndex].quantity;
    document.getElementById('product_unit').value =
      productList[productIndex].unit;
  };

  const clearFormOnClose = () => {
    $('#updateProductModal').on('hidden.bs.modal', function(e) {
      e.preventDefault();
      clearForm();
    });
  };

  $(document).on('click', '.edit_product_btn', function() {
    fillForm(this, products);
  });

  document
    .querySelector('#updateProductForm')
    .addEventListener('submit', async e => {
      e.preventDefault();

      const productName = document.getElementById('product_name').value;
      const productType = document.getElementById('product_type').value;
      const productBrand = document.getElementById('product_brand').value;
      const productCountry = document.getElementById('product_country').value;
      const productSupplier = document.getElementById('supplier_select').value;
      const productCost = document.getElementById('product_cost').value;
      const productDate = document.getElementById('product_date').value;
      const productPlace = document.getElementById('product_place_select')
        .value;
      const productSize = document.getElementById('product_size').value;
      const productQuantity = document.getElementById('product_quantity').value;
      const productUnit = document.getElementById('product_unit').value;

      const updateButton = document.querySelector('#updateProductButton');
      try {
        const axiosRes = await axios({
          method: 'patch',
          url: `http://127.0.0.1:3000/api/v1/product/${updateButton.dataset.product_id}`,
          responseType: 'json',
          data: {
            productName,
            productBrand,
            productType,
            productCountry,
            productSupplier,
            productCost,
            productDate,
            productPlace,
            productSize,
            productQuantity,
            productUnit
          }
        });
        message = axiosRes;
        console.log(message);
      } catch (error) {
        console.log(error.stack);
      }

      $(document).ready(function() {
        $('#updateProductModal').modal('hide');
      });
      window.location.reload(true);
    });
  clearFormOnClose();
};

const deleteProduct = () => {
  document
    .querySelector('#deleteProductButton')
    .addEventListener('click', async e => {
      e.preventDefault();
      const updateButton = document.querySelector('#updateProductButton');
      try {
        const axiosRes = await axios({
          method: 'delete',
          url: `http://127.0.0.1:3000/api/v1/product/${updateButton.dataset.product_id}`,
          responseType: 'json'
        });
        message = axiosRes;
        console.log(message);
      } catch (error) {
        console.log(error.stack);
      }
      $(document).ready(function() {
        $('#updateProductModal').modal('hide');
      });
      window.location.reload(true);
    });
};

const searchProduct = () => {
  const searchFunction = () => {
    const options = {
      keys: [],
      threshold: 0.2
    };
    const fuse = new Fuse(products, options);
    const searchBy = document.querySelector('#searchBy');
    const searchProductInput = document.querySelector('#searchProduct');
    if (options.keys[0] !== searchBy.value) {
      if (searchBy.value === 'Name') {
        options.keys[0] = 'product_name';
      } else if (searchBy.value === 'Brand') {
        options.keys[0] = 'brand';
      } else if (searchBy.value === 'Country') {
        options.keys[0] = 'country';
      } else if (searchBy.value === 'Supplier') {
        options.keys[0] = 'supplier_name';
      } else if (searchBy.value === 'Place') {
        options.keys[0] = 'place';
      }
    }
    const searchResult = fuse.search(searchProductInput.value);
    if (searchResult.length !== 0) {
      const productTable = document.querySelector('#productTable');
      const html = window.renderTable({ products: searchResult });
      const div = document.createElement('div');
      div.innerHTML = html;
      const parentOfTable = productTable.parentElement;
      parentOfTable.replaceChild(div.firstChild, productTable);
    }
    return searchResult;
  };
  document
    .querySelector('#searchProductButton')
    .addEventListener('click', e => {
      e.preventDefault();
      searchFunction();
    });
  $('#searchProduct').on('keypress', e => {
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
      header: 'Product Table',
      style: `#productTable tr td:nth-child(1), #productTable th:nth-child(1) {
          display: none
        } 
        #productTable {
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

const shiftProduct = () => {
  const searchTable = $('#shiftProductSearchTable');
  const shiftableProductTable = $('#shiftableProductTable');

  let shiftableProductList = [];

  const searchName = $('#shiftProductSearchName');
  const searchType = $('#shiftProductSearchType');
  const searchSize = $('#shiftProductSearchSize');

  const selectedProductForShift = $('#selectedProductForShift');
  const shiftTo = $('#shiftTo');
  const shiftFrom = $('#shiftFrom');
  const availableAmount = $('#availableAmount');

  const shiftProductButton = $('#shiftProductButton');

  let nameResult;
  let typeResult;
  let sizeResult;

  let shiftableProduct;

  searchTable.hide();

  const printShiftableProductTable = () => {
    const printTableButton = $('#printShiftableTableButton');
    printTableButton.click(e => {
      e.preventDefault();
      printJS({
        printable: 'shiftableProductTableDiv',
        type: 'html',
        style: `#shiftableProductTable tr td:nth-child(1), #shiftableProductTable th:nth-child(1) {
            display: none
          } 
            #shiftableProductTable {
              font-size: 12px; 
              border-collapse: collapse
            } 
            th, td {
              border: 1px solid orange;
              padding: 10px; text-align: left
            } 
            #printShiftableTableButton {
              display:none
            }`
      });
    });
  };
  const insertRowToSearchTable = product => {
    if (product.locked === undefined) {
      const row = `<tr>
      <td><button class='shiftProductSelect btn btn-light' data-productid='${product.product_id}' type='button'><i class='fa fa-exchange'></i></button></td>
      <td>${product.product_name}</td>
      <td>${product.type}</td>
      <td>${product.brand}</td>
      <td>${product.country}</td>
      <td>${product.supplier_name}</td>
      <td>${product.size}</td>
      <td>${product.quantity} ${product.unit}</td>
      <td>${product.cost}</td></tr>`;
      searchTable.find('tbody').append(row);
    }
  };

  const insertRowToShiftableTable = product => {
    const row = `<tr>
    <td><button class='removeShiftableProduct btn btn-light' data-productid = ${product.product_id} type='button'><i class='fa fa-close'></i></button></td>
    <td>${product.product_name}</td>
    <td>${product.type}</td>
    <td>${product.brand}</td>
    <td>${product.country}</td>
    <td>${product.supplier_name}</td>
    <td>${product.size}</td>
    <td>${product.quantity} ${product.unit}</td>
    <td>${product.moveQuantity}</td>
    <td>${product.place}</td>
    <td>${product.shiftTo}</td></tr>`;
    shiftableProductTable.find('tbody').append(row);
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
      keys: ['product_name'],
      threshold: 0.1
    };
    const fuse = new Fuse(products, options);
    nameResult = fuse.search(searchName.val());
    searchTable.find('tbody').empty();
    if (nameResult.length >= 1) {
      searchTable.show();
      nameResult.forEach(res => insertRowToSearchTable(res));
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
        typeResult.forEach(res => insertRowToSearchTable(res));
      }
    } else {
      typeResult = nameResult;
    }
  });

  searchSize.on('focusout', e => {
    e.preventDefault();

    const options = {
      keys: ['size'],
      threshold: 0.5
    };
    const fuse = new Fuse(typeResult, options);

    if (searchSize.val().length > 0) {
      sizeResult = fuse.search(searchSize.val());
      searchTable.find('tbody').empty();

      if (sizeResult.length >= 1) {
        sizeResult.forEach(res => insertRowToSearchTable(res));
      }
    } else {
      sizeResult = typeResult;
    }
  });

  $(document).on('click', '.shiftProductSelect', function() {
    const dom = $(this).get();

    let productId = dom[0].dataset.productid;
    productId = parseInt(productId, 10);
    shiftableProduct = products.find(
      product => product.product_id === productId
    );

    const removeSelectedRow = () => {
      $(this)
        .parent()
        .parent()
        .remove();
    };

    removeSelectedRow();

    selectedProductForShift.val(shiftableProduct.product_name);

    shiftFrom.val(shiftableProduct.place);

    availableAmount.val(
      `${shiftableProduct.quantity} ${shiftableProduct.unit}`
    );

    searchType.val('');
    searchSize.val('');
  });

  $(document).on('click', '.removeShiftableProduct', function() {
    let productId = this.dataset.productid;
    productId = parseInt(productId, 10);
    console.log(productId);
    const unshiftableProduct = products.find(
      product => product.product_id === productId
    );

    unshiftableProduct.locked = undefined;

    shiftableProductList = shiftableProductList.filter(product => {
      return product.product_id !== unshiftableProduct.product_id;
    });

    const removeSelectedRow = () => {
      $(this)
        .parent()
        .parent()
        .remove();
    };

    removeSelectedRow();
  });

  $('#shiftableProductInfoForm').on('submit', e => {
    e.preventDefault();

    const error = $('#errorShifting');
    const moveAmount = $('#moveAmount');
    if (selectedProductForShift.val() === '') {
      error.html('Please select a product to shift!');
      error.show();
    } else if (
      parseInt(moveAmount.val(), 10) <= shiftableProduct.quantity &&
      shiftFrom.val() !== shiftTo.val()
    ) {
      error.hide();

      shiftableProduct.locked = true;
      shiftableProduct.moveQuantity = parseInt(moveAmount.val(), 10);
      shiftableProduct.shiftTo = shiftTo.val();

      insertRowToShiftableTable(shiftableProduct);

      shiftableProductList.push(shiftableProduct);

      selectedProductForShift.val('');
      shiftTo.val('');
      shiftFrom.val('');
      availableAmount.val('');
      moveAmount.val('');
    } else {
      if (shiftFrom.val() === shiftTo.val()) {
        error.html('Can not shift to same godown!');
      } else if (parseInt(moveAmount.val(), 10) > shiftableProduct.quantity) {
        error.html('Can not move more than available!');
      }
      error.show();
    }
  });

  shiftProductButton.on('click', async e => {
    e.preventDefault();
    const shiftData = [];
    for (let i = 0; i < shiftableProductList.length; i += 1) {
      const singleShiftData = {};
      singleShiftData.productId = shiftableProductList[i].product_id;
      singleShiftData.amount = shiftableProductList[i].moveQuantity;
      singleShiftData.shiftTo = shiftableProductList[i].shiftTo;
      shiftData.push(singleShiftData);
    }
    try {
      const axiosRes = await axios({
        method: 'post',
        url: `http://127.0.0.1:3000/api/v1/product/shift`,
        responseType: 'json',
        data: {
          shiftData
        }
      });
      message = axiosRes;
      console.log(message);
      window.location.reload(true);
    } catch (error) {
      console.log(error.stack);
    }
  });

  printShiftableProductTable();
};

setupMode();
setupSupplierAndGodown();

addProduct();
updateProduct();
deleteProduct();
searchProduct();
shiftProduct();

printStockTable();

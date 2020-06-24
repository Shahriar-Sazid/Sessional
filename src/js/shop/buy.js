/* eslint-disable no-console */
/* eslint-disable no-undef */
/*eslint-env browser*/
const setup = async () => {
  let supplierNames;
  let godownNames;
  let unitNames;

  const supplierOptions = document.querySelector('#newProductSupplierSelect');
  const godownOptions = document.querySelector('#newProductPlaceSelect');
  const unitOptions = document.querySelector('#newProductUnit');

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

  if (unitOptions.childElementCount === 0) {
    try {
      const axiosRes = await axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/api/v1/unit/name',
        responseType: 'json'
      });
      unitNames = axiosRes.data;
    } catch (error) {
      console.log(error.stack);
    }

    for (let i = 0; i < unitNames.length; i += 1) {
      const option = document.createElement('option');
      option.text = unitNames[i].unit_name;
      unitOptions.add(option);
    }
  }

  unitOptions.value = '';
  supplierOptions.value = '';
  godownOptions.value = '';

  let now = new Date();
  now = now.toISOString().slice(0, 10);
  $('#newProductDate').val(now);
};

const buyProduct = () => {
  const searchTable = $('#buyProductSearchTable');

  const searchName = $('#buyProductSearchName');
  const searchType = $('#buyProductSearchType');
  const searchSize = $('#buyProductSearchSize');

  let nameResult;
  let typeResult;
  let sizeResult;

  const newProductForm = $('#newProductForm');

  const newProductsTable = $('#newProductsTable');
  const addProductForm = $('#addProductForm');
  const newProductsList = [];

  searchTable.hide();

  const insertRowToSearchTable = product => {
    if (product.locked === undefined) {
      const row = `<tr>
        <td><button class='buyProductSelect btn btn-light' data-productid='${product.product_id}' type='button'><i class='fa fa-exchange'></i></button></td>
        <td>${product.name}</td>
        <td>${product.type}</td>
        <td>${product.brand}</td>
        <td>${product.country}</td>
        <td>${product.size}</td></tr>`;
      searchTable.find('tbody').append(row);
    }
  };

  const insertRowToNewProductTable = product => {
    const row = `<tr>
    <td><button class='removeNewProduct btn btn-light' type='button'><i class='fa fa-close'></i></button></td>
    <td>${product.name}</td>
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
      threshold: 1
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

  $(document).on('click', '.buyProductSelect', function() {
    let productId = this.dataset.productid;
    productId = parseInt(productId, 10);
    buyableProduct = products.find(product => product.product_id === productId);
    buyButton = $('#buyNewProductButton');
    buyButton[0].dataset.id = productId;
    const removeSelectedRow = () => {
      $(this)
        .parent()
        .parent()
        .remove();
    };

    removeSelectedRow();

    $('#newProductName').val(buyableProduct.name);
    $('#newProductType').val(buyableProduct.type);
    $('#newProductBrand').val(buyableProduct.brand);
    $('#newProductCountry').val(buyableProduct.country);
    $('#newProductSize').val(buyableProduct.size);
  });

  $('#newProductSupplierSelect').on('input', function() {
    this.disabled = true;
  });
  $('#newProductDate').on('input', function() {
    this.disabled = true;
  });

  newProductForm.on('submit', function(e) {
    e.preventDefault();
    const product = {};
    product.productId = parseInt(this.elements[11].dataset.id, 10);
    product.name = $('#newProductName').val();
    product.type = $('#newProductType').val();
    product.brand = $('#newProductBrand').val();
    product.country = $('#newProductCountry').val();
    product.supplierName = $('#newProductSupplierSelect').val();
    product.cost = $('#newProductCost').val();
    product.date = $('#newProductDate').val();
    product.place = $('#newProductPlaceSelect').val();
    product.size = $('#newProductSize').val();
    product.quantity = $('#newProductQuantity').val();
    product.unit = $('#newProductUnit').val();
    $('#newProductCost').val('');
    $('#newProductQuantity').val('');
    $('#newProductUnit').val('');
    $('#newProductName').val('');
    $('#newProductType').val('');
    $('#newProductBrand').val('');
    $('#newProductCountry').val('');

    if (
      newProductsList.find(pr => pr.productId === product.productId) ===
      undefined
    ) {
      newProductsList.push(product);
      insertRowToNewProductTable(product);
    }
  });

  $(document).on('click', '.removeNewProduct', function() {
    const row = $(this)
      .parent()
      .parent();

    newProductsList.splice(row.index(), 1);
    row.remove();
  });
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
      window.location.assign('http://127.0.0.1:3000/stock');
    }
  });
  printNewProductsTable();
};

buyProduct();
setup();

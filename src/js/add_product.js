/* eslint-disable no-console */
/* eslint-disable no-undef */
/*eslint-env browser*/

const setupSupplierAndGodown = async () => {
  let supplierNames;
  let godownNames;

  const supplierOptions = document.getElementById('supplier_select');
  const godownOptions = document.getElementById('product_place_select');

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
};

const updateEditModal = () => {
  const modalTitle = document.querySelector('#exampleModalLongTitle');
  const updateButton = document.querySelector('#product_save_btn');
  const deleteProductButton = document.querySelector('#deleteProductButton');

  modalTitle.innerHTML = 'Edit Product';
  updateButton.innerHTML = 'Update';

  updateButton.disabled = true;

  deleteProductButton.style = 'display: inline';
};

const updateAddModal = () => {
  const modalTitle = document.querySelector('#exampleModalLongTitle');
  const updateButton = document.querySelector('#product_save_btn');
  const deleteProductButton = document.querySelector('#deleteProductButton');

  modalTitle.innerHTML = 'Add Product';
  updateButton.innerHTML = 'Add';

  updateButton.disabled = true;

  deleteProductButton.style = 'display: none';
};

const clearForm = function(e) {
  e.preventDefault();

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
  const productId = btn.dataset.product_id;
  const productIndex = btn.dataset.idx;

  const updateButton = document.querySelector('#product_save_btn');
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

const setupAddProductButton = () => {
  document.querySelector('#add_product_btn').addEventListener('click', e => {
    e.preventDefault();
    updateAddModal();
  });
};

const setupEditProductButton = productList => {
  const editProductButtons = document.querySelectorAll('.edit_product_btn');
  for (let i = 0; i < editProductButtons.length; i += 1) {
    const btn = editProductButtons[i];
    btn.addEventListener('click', e => {
      e.preventDefault();
      updateEditModal();
      fillForm(btn, productList);
    });
  }
};

const setupUpdateProductButton = () => {
  document.querySelector('#add_product_form').addEventListener('input', e => {
    e.preventDefault();
    const updateButton = document.querySelector('#product_save_btn');
    updateButton.disabled = false;
  });
};

const addOrUpdateProduct = () => {
  document
    .querySelector('#add_product_form')
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

      const updateButton = document.querySelector('#product_save_btn');
      if (updateButton.innerHTML === 'Add') {
        try {
          const axiosRes = await axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/api/v1/product',
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
      } else {
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
      }

      $(document).ready(function() {
        $('#exampleModalLong').modal('hide');
      });
      window.location.reload(true);
    });
};

const clearFormOnClose = () => {
  $('#exampleModalLong').on('hidden.bs.modal', function(e) {
    clearForm(e);
  });
};

const deleteProduct = () => {
  document
    .querySelector('#deleteProductButton')
    .addEventListener('click', async e => {
      e.preventDefault();
      const updateButton = document.querySelector('#product_save_btn');
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
        $('#exampleModalLong').modal('hide');
      });
      window.location.reload(true);
    });
};

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

const searchProduct = () => {
  document
    .querySelector('#searchProductButton')
    .addEventListener('click', e => {
      e.preventDefault();
      const searchResult = searchFunction();
      if (searchResult.length !== 0) {
        setupEditProductButton(searchResult);
        setupUpdateProductButton();
      }
    });
  $('#searchProduct').on('keypress', e => {
    if (e.which === 13) {
      e.preventDefault();
      const searchResult = searchFunction();
      if (searchResult.length !== 0) {
        setupEditProductButton(searchResult);
        setupUpdateProductButton();
      }
    }
  });
};

setupSupplierAndGodown();
setupAddProductButton();
setupEditProductButton(products);
setupUpdateProductButton();

addOrUpdateProduct();
deleteProduct();
searchProduct();

clearFormOnClose();

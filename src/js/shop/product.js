/* eslint-disable no-console */
/* eslint-disable no-undef */
/*eslint-env browser*/

const addOrUpdateProduct = () => {
  const modalTitle = $('#addProductModalTitle');
  const addProductForm = $('#updateProductForm');
  const addButton = $('#productSaveButton');
  const addProductModal = $('#addProductModal');
  const deleteButton = $('#deleteProductButton');

  const updatedProduct = {};

  const setupUpdateModal = () => {
    modalTitle.html('Update Product');
    addButton.html('Update');
    addButton.attr('disabled', true);
    deleteButton.show();
  };

  $(document).on('click', '.addProductButton', () => {
    if (page === 'Product') {
      const setupAddModal = () => {
        modalTitle.html('Add Product');
        addButton.html('Add');
        addButton.attr('disabled', false);
        deleteButton.hide();
      };
      setupAddModal();
      addProductModal.modal('show');
    }
  });

  const fillForm = id => {
    id = parseInt(id, 10);
    const product = products.find(elem => elem.product_id === id);

    $('#product_name').val(product.name);
    $('#product_type').val(product.type);
    $('#product_brand').val(product.brand);
    $('#product_country').val(product.country);
    $('#product_size').val(product.size);
  };

  $(document).on('click', '.updateProductButton', function() {
    updatedProduct.id = this.dataset.id;
    setupUpdateModal();
    fillForm(updatedProduct.id);
    addProductModal.modal('show');
  });

  addProductForm.on('input', function(e) {
    e.preventDefault();
    addButton.attr('disabled', false);
  });

  addProductForm.on('submit', async function(e) {
    e.preventDefault();

    if (modalTitle.html() === 'Add Product') {
      const product = {};

      product.name = $('#product_name').val();
      product.type = $('#product_type').val();
      product.brand = $('#product_brand').val();
      product.country = $('#product_country').val();
      product.size = $('#product_size').val();

      try {
        const axiosRes = await axios({
          method: 'post',
          url: 'http://127.0.0.1:3000/api/v1/product/',
          responseType: 'json',
          data: {
            product
          }
        });
        message = axiosRes;
        console.log(message);
      } catch (error) {
        console.log(error.stack);
      }
    } else if (modalTitle.html() === 'Update Product') {
      updatedProduct.name = $('#product_name').val();
      updatedProduct.type = $('#product_type').val();
      updatedProduct.brand = $('#product_brand').val();
      updatedProduct.country = $('#product_country').val();
      updatedProduct.size = $('#product_size').val();

      try {
        const axiosRes = await axios({
          method: 'patch',
          url: `http://127.0.0.1:3000/api/v1/product/`,
          responseType: 'json',
          data: {
            updatedProduct
          }
        });
        message = axiosRes;
        console.log(message);
      } catch (error) {
        console.log(error.stack);
      }
    }
    $(document).ready(function() {
      $('#addProductModal').modal('hide');
    });
    window.location.reload(true);
  });

  const clearFormOnClose = () => {
    $('#addProductModal').on('hidden.bs.modal', function(e) {
      e.preventDefault();

      $('#product_name').val('');
      $('#product_type').val('');
      $('#product_brand').val('');
      $('#product_country').val('');
      $('#product_size').val('');
    });
  };

  clearFormOnClose();
};

const printProductTable = () => {
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

const searchProduct = () => {
  const searchButton = $('#searchProductButton');

  const searchFunction = () => {
    const options = {
      keys: [],
      threshold: 0.2
    };

    const fuse = new Fuse(products, options);

    const searchBy = document.querySelector('#searchBy');
    const searchProductInput = document.querySelector('#searchProductInput');

    if (searchBy.value === 'Name') {
      options.keys.push('name');
    } else if (searchBy.value === 'Brand') {
      options.keys.push('brand');
    } else if (searchBy.value === 'Country') {
      options.keys.push('country');
    }
    const searchResult = fuse.search(searchProductInput.value);
    if (searchResult.length !== 0) {
      const productTable = document.querySelector('#productTable');
      const html = window.renderProductTable({ products: searchResult });
      const div = document.createElement('div');
      div.innerHTML = html;
      const parentOfTable = productTable.parentElement;
      parentOfTable.replaceChild(div.firstChild, productTable);
    }
    return searchResult;
  };

  searchButton.click(e => {
    e.preventDefault();
    searchFunction();
  });

  $('#searchProductInput').on('keypress', e => {
    if (e.which === 13) {
      e.preventDefault();
      searchFunction();
    }
  });
};

addOrUpdateProduct();
searchProduct();
printProductTable();

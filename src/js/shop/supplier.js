/* eslint-disable no-console */
/* eslint-disable no-undef */
/*eslint-env browser*/

const addOrUpdateSupplier = () => {
  const modalTitle = $('#addSupplierModalTitle');
  const addSupplierForm = $('#addSupplierForm');
  const errorAlert = $('#errorAddSupplier');
  const addButton = $('#supplierSaveButton');

  const updatedSupplier = {};

  const setupUpdateModal = () => {
    modalTitle.html('Update Supplier');
    addButton.html('Update');
    addButton.attr('disabled', true);
    $('#supplierName').attr('disabled', true);
  };

  $(document).on('click', '.addSupplierButton', () => {
    if (page === 'Supplier') {
      const setupAddModal = () => {
        modalTitle.html('Add Supplier');
        addButton.html('Add');

        addButton.attr('disabled', false);
      };
      setupAddModal();
      const addSupplierModal = $('#addSupplierModal');
      addSupplierModal.modal('show');
    }
  });

  const fillForm = btn => {
    const supplierName = btn.dataset.suppliername;

    const supplier = suppliers.find(
      elem => elem.supplier_name === supplierName
    );

    updatedSupplier.prevName = supplier.supplier_name;

    $('#supplierName').val(supplier.supplier_name);
    $('#supplierCompany').val(supplier.company_name);
    $('#supplierAddress').val(supplier.address);
    $('#supplierMobile1').val(supplier.mobile_no_1);
    $('#supplierMobile2').val(supplier.mobile_no_2);
    $('#supplierTelephone').val(supplier.telephone);
    $('#supplierEmail').val(supplier.email);
  };

  $(document).on('click', '.updateSupplierButton', function() {
    setupUpdateModal();
    fillForm(this);
  });

  addSupplierForm.on('input', function(e) {
    e.preventDefault();
    addButton.attr('disabled', false);
  });

  addSupplierForm.on('submit', async function(e) {
    e.preventDefault();

    if (modalTitle.html() === 'Add Supplier') {
      errorAlert.hoise = false;
      const supplier = {};

      supplier.name = $('#supplierName').val();
      supplier.company = $('#supplierCompany').val();
      supplier.address = $('#supplierAddress').val();
      supplier.mobile1 = $('#supplierMobile1').val();
      supplier.mobile2 = $('#supplierMobile2').val();
      supplier.telephone = $('#supplierTelephone').val();
      supplier.email = $('#supplierEmail').val();

      for (let i = 0; i < suppliers.length; i += 1) {
        if (suppliers[i].supplier_name === supplier.name) {
          errorAlert.show();
          errorAlert.hoise = true;
        }
      }
      if (!errorAlert.hoise) {
        try {
          const axiosRes = await axios({
            method: 'post',
            url: `http://127.0.0.1:3000/api/v1/supplier/`,
            responseType: 'json',
            data: {
              supplier
            }
          });
          message = axiosRes;
          console.log(message);
        } catch (error) {
          console.log(error.stack);
        }
      }
    } else if (modalTitle.html() === 'Update Supplier') {
      updatedSupplier.name = $('#supplierName').val();
      updatedSupplier.company = $('#supplierCompany').val();
      updatedSupplier.address = $('#supplierAddress').val();
      updatedSupplier.mobile1 = $('#supplierMobile1').val();
      updatedSupplier.mobile2 = $('#supplierMobile2').val();
      updatedSupplier.telephone = $('#supplierTelephone').val();
      updatedSupplier.email = $('#supplierEmail').val();

      try {
        const axiosRes = await axios({
          method: 'patch',
          url: `http://127.0.0.1:3000/api/v1/supplier/`,
          responseType: 'json',
          data: {
            updatedSupplier
          }
        });
        message = axiosRes;
        console.log(message);
      } catch (error) {
        console.log(error.stack);
      }
    }
    $(document).ready(function() {
      $('#addSupplierModal').modal('hide');
    });
    window.location.reload(true);
  });

  const clearFormOnClose = () => {
    $('#addSupplierModal').on('hidden.bs.modal', function(e) {
      e.preventDefault();

      $('#supplierName').val('');
      $('#supplierCompany').val('');
      $('#supplierAddress').val('');
      $('#supplierMobile1').val('');
      $('#supplierMobile2').val('');
      $('#supplierTelephone').val('');
      $('#supplierEmail').val('');
      errorAlert.hide();
    });
  };

  clearFormOnClose();
};

const printSupplierTable = () => {
  const printTableButton = document.querySelector('#printTableButton');
  printTableButton.addEventListener('click', e => {
    e.preventDefault();
    printJS({
      printable: 'tableDiv',
      type: 'html',
      header: 'Supplier Table',
      style: `#supplierTable tr td:nth-child(1), #supplierTable th:nth-child(1) {
            display: none
          } 
          #supplierTable {
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

const searchSupplier = () => {
  const searchButton = $('#searchSupplierButton');

  const searchFunction = () => {
    const options = {
      keys: [],
      threshold: 0.2
    };

    const fuse = new Fuse(suppliers, options);

    const searchBy = document.querySelector('#searchBy');
    const searchSupplierInput = document.querySelector('#searchSupplierInput');

    if (searchBy.value === 'Name') {
      options.keys.push('supplier_name');
    } else if (searchBy.value === 'Mobile') {
      options.keys.push('mobile_no_1');
      options.keys.push('mobile_no_2');
      options.keys.push('telephone_no');
    } else if (searchBy.value === 'Address') {
      options.keys.push('address');
    }
    const searchResult = fuse.search(searchSupplierInput.value);
    if (searchResult.length !== 0) {
      const supplierTable = document.querySelector('#supplierTable');
      const html = window.renderSupplierTable({ suppliers: searchResult });
      const div = document.createElement('div');
      div.innerHTML = html;
      const parentOfTable = supplierTable.parentElement;
      parentOfTable.replaceChild(div.firstChild, supplierTable);
    }
    return searchResult;
  };

  searchButton.click(e => {
    e.preventDefault();
    searchFunction();
  });

  $('#searchSupplierInput').on('keypress', e => {
    if (e.which === 13) {
      e.preventDefault();
      searchFunction();
    }
  });
};

addOrUpdateSupplier();
searchSupplier();
printSupplierTable();

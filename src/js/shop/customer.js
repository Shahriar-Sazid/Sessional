/* eslint-disable no-console */
/* eslint-disable no-undef */
/*eslint-env browser*/

const addOrUpdateCustomer = () => {
  const modalTitle = $('#addCustomerModalTitle');
  const addCustomerForm = $('#addCustomerForm');
  const errorAlert = $('#errorAddCustomer');
  const addButton = $('#customerSaveButton');

  const updatedCustomer = {};

  const setupUpdateModal = () => {
    modalTitle.html('Update Customer');
    addButton.html('Update');
    addButton.attr('disabled', true);
    $('#customerName').attr('disabled', true);
  };

  $(document).on('click', '.addCustomerButton', () => {
    if (page === 'Customer') {
      const setupAddModal = () => {
        modalTitle.html('Add Customer');
        addButton.html('Add');

        addButton.attr('disabled', false);
      };
      setupAddModal();
      const addCustomerModal = $('#addCustomerModal');
      addCustomerModal.modal('show');
    }
  });

  const fillForm = btn => {
    const customerName = btn.dataset.customername;

    const customer = customers.find(
      elem => elem.customer_name === customerName
    );

    updatedCustomer.prevName = customer.customer_name;

    $('#customerName').val(customer.customer_name);
    $('#customerCompany').val(customer.company_name);
    $('#customerAddress').val(customer.address);
    $('#customerMobile1').val(customer.mobile_no_1);
    $('#customerMobile2').val(customer.mobile_no_2);
    $('#customerTelephone').val(customer.telephone);
    $('#customerEmail').val(customer.email);
  };

  $(document).on('click', '.updateCustomerButton', function() {
    setupUpdateModal();
    fillForm(this);
  });

  addCustomerForm.on('input', function(e) {
    e.preventDefault();
    addButton.attr('disabled', false);
  });

  addCustomerForm.on('submit', async function(e) {
    e.preventDefault();

    if (modalTitle.html() === 'Add Customer') {
      errorAlert.hoise = false;
      const customer = {};

      customer.name = $('#customerName').val();
      customer.company = $('#customerCompany').val();
      customer.address = $('#customerAddress').val();
      customer.mobile1 = $('#customerMobile1').val();
      customer.mobile2 = $('#customerMobile2').val();
      customer.telephone = $('#customerTelephone').val();
      customer.email = $('#customerEmail').val();

      for (let i = 0; i < customers.length; i += 1) {
        if (customers[i].customer_name === customer.name) {
          errorAlert.show();
          errorAlert.hoise = true;
        }
      }
      if (!errorAlert.hoise) {
        try {
          const axiosRes = await axios({
            method: 'post',
            url: `http://127.0.0.1:3000/api/v1/customer/`,
            responseType: 'json',
            data: {
              customer
            }
          });
          message = axiosRes;
          console.log(message);
        } catch (error) {
          console.log(error.stack);
        }
      }
    } else if (modalTitle.html() === 'Update Customer') {
      updatedCustomer.name = $('#customerName').val();
      updatedCustomer.company = $('#customerCompany').val();
      updatedCustomer.address = $('#customerAddress').val();
      updatedCustomer.mobile1 = $('#customerMobile1').val();
      updatedCustomer.mobile2 = $('#customerMobile2').val();
      updatedCustomer.telephone = $('#customerTelephone').val();
      updatedCustomer.email = $('#customerEmail').val();

      try {
        const axiosRes = await axios({
          method: 'patch',
          url: `http://127.0.0.1:3000/api/v1/customer/`,
          responseType: 'json',
          data: {
            updatedCustomer
          }
        });
        message = axiosRes;
        console.log(message);
      } catch (error) {
        console.log(error.stack);
      }
    }
    $(document).ready(function() {
      $('#addCustomerModal').modal('hide');
    });
    window.location.reload(true);
  });

  const clearFormOnClose = () => {
    $('#addCustomerModal').on('hidden.bs.modal', function(e) {
      e.preventDefault();

      $('#customerName').val('');
      $('#customerCompany').val('');
      $('#customerAddress').val('');
      $('#customerMobile1').val('');
      $('#customerMobile2').val('');
      $('#customerTelephone').val('');
      $('#customerEmail').val('');
      errorAlert.hide();
    });
  };

  clearFormOnClose();
};

const printCustomerTable = () => {
  const printTableButton = document.querySelector('#printTableButton');
  printTableButton.addEventListener('click', e => {
    e.preventDefault();
    printJS({
      printable: 'tableDiv',
      type: 'html',
      header: 'Customer Table',
      style: `#customerTable tr td:nth-child(1), #customerTable th:nth-child(1) {
          display: none
        } 
        #customerTable {
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

const searchCustomer = () => {
  const searchButton = $('#searchCustomerButton');

  const searchFunction = () => {
    const options = {
      keys: [],
      threshold: 0.2
    };

    const fuse = new Fuse(customers, options);

    const searchBy = document.querySelector('#searchBy');
    const searchCustomerInput = document.querySelector('#searchCustomerInput');

    if (searchBy.value === 'Name') {
      options.keys.push('customer_name');
    } else if (searchBy.value === 'Mobile') {
      options.keys.push('mobile_no_1');
      options.keys.push('mobile_no_2');
      options.keys.push('telephone_no');
    } else if (searchBy.value === 'Address') {
      options.keys.push('address');
    }
    const searchResult = fuse.search(searchCustomerInput.value);
    if (searchResult.length !== 0) {
      const customerTable = document.querySelector('#customerTable');
      const html = window.renderCustomerTable({ customers: searchResult });
      const div = document.createElement('div');
      div.innerHTML = html;
      const parentOfTable = customerTable.parentElement;
      parentOfTable.replaceChild(div.firstChild, customerTable);
    }
    return searchResult;
  };

  searchButton.click(e => {
    e.preventDefault();
    searchFunction();
  });

  $('#searchCustomerInput').on('keypress', e => {
    if (e.which === 13) {
      e.preventDefault();
      searchFunction();
    }
  });
};

addOrUpdateCustomer();
searchCustomer();
printCustomerTable();

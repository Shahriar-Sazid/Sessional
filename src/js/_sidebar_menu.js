/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-env browser */

const setupBar = () => {
  const setupProductSwitch = () => {
    $(document).on('click', '#viewProductSwitch', () => {
      window.location.assign('http://127.0.0.1:3000/product?mode=view');
    });

    $(document).on('click', '.addProductSwitch', () => {
      if (page === 'Stock View') {
        const stockView = $('#stockView');
        const shiftView = $('#shiftView');
        const addView = $('#addView');
        shiftView.hide();
        stockView.hide();
        addView.show();
      } else {
        window.location.assign('http://127.0.0.1:3000/product?mode=add');
      }
    });

    $(document).on('click', '.shiftProductSwitch', () => {
      if (page === 'Stock View') {
        const stockView = $('#stockView');
        const shiftView = $('#shiftView');
        const addView = $('#addView');
        stockView.hide();
        addView.hide();
        shiftView.show();
      } else {
        window.location.assign('http://127.0.0.1:3000/product?mode=shift');
      }
    });
  };

  const setupCustomerSwitch = () => {
    $(document).on('click', '#viewCustomerSwitch', () => {
      window.location.assign('http://127.0.0.1:3000/supplier?mode=view');
    });

    $(document).on('click', '.addCustomerSwitch', () => {
      if (page === 'Customer') {
        const setupAddModal = () => {
          const modalTitle = $('#addCustomerModalTitle');
          const addButton = $('#supplierSaveButton');

          modalTitle.html('Add Customer');
          addButton.html('Add');

          addButton.attr('disabled', false);
        };
        setupAddModal();
        const addCustomerModal = $('#addCustomerModal');
        addCustomerModal.modal('show');
      } else {
        window.location.assign('http://127.0.0.1:3000/supplier?mode=add');
      }
    });
  };

  const setupSupplierSwitch = () => {
    $(document).on('click', '#viewSupplierSwitch', () => {
      window.location.assign('http://127.0.0.1:3000/supplier?mode=view');
    });

    $(document).on('click', '.addSupplierSwitch', () => {
      if (page === 'Supplier') {
        const setupAddModal = () => {
          const modalTitle = $('#addSupplierModalTitle');
          const addButton = $('#supplierSaveButton');

          modalTitle.html('Add Supplier');
          addButton.html('Add');

          addButton.attr('disabled', false);
        };
        setupAddModal();
        const addSupplierModal = $('#addSupplierModal');
        addSupplierModal.modal('show');
      } else {
        window.location.assign('http://127.0.0.1:3000/supplier?mode=add');
      }
    });
  };
  setupProductSwitch();
  setupCustomerSwitch();
  setupSupplierSwitch();
};

setupBar();

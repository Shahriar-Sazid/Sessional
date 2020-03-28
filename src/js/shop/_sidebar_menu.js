/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-env browser */

const setupBar = () => {
  $(document).on('click', '#viewProductSwitch', () => {
    window.location.assign('http://127.0.0.1:3000/product');
  });

  $(document).on('click', '#viewCustomerSwitch', () => {
    window.location.assign('http://127.0.0.1:3000/customer');
  });

  $(document).on('click', '#viewSupplierSwitch', () => {
    window.location.assign('http://127.0.0.1:3000/supplier');
  });

  $(document).on('click', '#viewGodownSwitch', () => {
    window.location.assign('http://127.0.0.1:3000/godown');
  });

  $(document).on('click', '#viewAccountSwitch', () => {
    window.location.assign('http://127.0.0.1:3000/account');
  });

  $(document).on('click', '#buySwitch', () => {
    window.location.assign('http://127.0.0.1:3000/stock/buy');
  });

  $(document).on('click', '#stockSwitch', () => {
    window.location.assign('http://127.0.0.1:3000/stock');
  });

  $(document).on('click', '#sellSwitch', () => {
    window.location.assign('http://127.0.0.1:3000/stock/sell');
  });
};

setupBar();

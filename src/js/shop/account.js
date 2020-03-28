/* eslint-disable no-console */
/* eslint-disable no-undef */
/*eslint-env browser*/

const addOrUpdateAccount = () => {
  const modalTitle = $('#addAccountModalTitle');
  const addAccountForm = $('#addAccountForm');
  const errorAlert = $('#errorAddAccount');
  const addButton = $('#accountSaveButton');

  const updatedAccount = {};

  const setupUpdateModal = () => {
    modalTitle.html('Update Account');
    addButton.html('Update');
    addButton.attr('disabled', true);
  };

  $(document).on('click', '.addAccountButton', () => {
    if (page === 'Account') {
      const setupAddModal = () => {
        modalTitle.html('Add Account');
        addButton.html('Add');

        addButton.attr('disabled', false);
      };
      setupAddModal();
      const addAccountModal = $('#addAccountModal');
      addAccountModal.modal('show');
    }
  });

  const fillForm = btn => {
    const accountName = btn.dataset.accountname;

    const account = accounts.find(elem => elem.account_name === accountName);

    updatedAccount.prevName = account.account_name;

    $('#accountName').val(account.account_name);
    $('#holderName').val(account.holder_name);
    $('#accountNo').val(account.account_no);
    $('#accountBank').val(account.bank);
    $('#accountBranch').val(account.branch);
  };

  $(document).on('click', '.updateAccountButton', function() {
    setupUpdateModal();
    fillForm(this);
  });

  addAccountForm.on('input', function(e) {
    e.preventDefault();
    addButton.attr('disabled', false);
  });

  addAccountForm.on('submit', async function(e) {
    e.preventDefault();

    if (modalTitle.html() === 'Add Account') {
      errorAlert.hoise = false;
      const account = {};

      account.account_name = $('#accountName').val();
      account.holder_name = $('#holderName').val();
      account.no = $('#accountNo').val();
      account.bank = $('#accountBank').val();
      account.branch = $('#accountBranch').val();

      for (let i = 0; i < accounts.length; i += 1) {
        if (accounts[i].account_name === account.name) {
          errorAlert.show();
          errorAlert.hoise = true;
        }
      }
      if (!errorAlert.hoise) {
        try {
          const axiosRes = await axios({
            method: 'post',
            url: `http://127.0.0.1:3000/api/v1/account/`,
            responseType: 'json',
            data: {
              account
            }
          });
          message = axiosRes;
          console.log(message);
        } catch (error) {
          console.log(error.stack);
        }
      }
    } else if (modalTitle.html() === 'Update Account') {
      errorAlert.hoise = false;

      updatedAccount.account_name = $('#accountName').val();
      updatedAccount.holder_name = $('#holderName').val();
      updatedAccount.no = $('#accountNo').val();
      updatedAccount.bank = $('#accountBank').val();
      updatedAccount.branch = $('#accountBranch').val();

      for (let i = 0; i < accounts.length; i += 1) {
        if (accounts[i].account_name === updatedAccount.name) {
          errorAlert.show();
          errorAlert.hoise = true;
        }
      }
      console.log(updatedAccount);
      if (!errorAlert.hoise) {
        try {
          const axiosRes = await axios({
            method: 'patch',
            url: `http://127.0.0.1:3000/api/v1/account/`,
            responseType: 'json',
            data: {
              updatedAccount
            }
          });
          message = axiosRes;
          console.log(message);
        } catch (error) {
          console.log(error.stack);
        }
      }
    }
    $(document).ready(function() {
      $('#addAccountModal').modal('hide');
    });
    window.location.reload(true);
  });

  const clearFormOnClose = () => {
    $('#addAccountModal').on('hidden.bs.modal', function(e) {
      e.preventDefault();

      $('#accountName').val('');
      $('#holderName').val('');
      $('#accountNo').val('');
      $('#accountBank').val('');
      $('#accountBranch').val('');

      errorAlert.hide();
    });
  };

  clearFormOnClose();
};

const printAccountTable = () => {
  const printTableButton = document.querySelector('#printTableButton');
  printTableButton.addEventListener('click', e => {
    e.preventDefault();
    printJS({
      printable: 'tableDiv',
      type: 'html',
      header: 'Account Table',
      style: `#accountTable tr td:nth-child(1), #accountTable th:nth-child(1) {
              display: none
            } 
            #accountTable {
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

const searchAccount = () => {
  const searchButton = $('#searchAccountButton');

  const searchFunction = () => {
    const options = {
      keys: [],
      threshold: 0.2
    };

    const fuse = new Fuse(accounts, options);

    const searchBy = document.querySelector('#searchBy');
    const searchAccountInput = document.querySelector('#searchAccountInput');

    if (searchBy.value === 'Name') {
      options.keys.push('account_name');
    } else if (searchBy.value === 'Bank') {
      options.keys.push('bank');
    }
    const searchResult = fuse.search(searchAccountInput.value);
    if (searchResult.length !== 0) {
      const accountTable = document.querySelector('#accountTable');
      const html = window.renderAccountTable({ accounts: searchResult });
      const div = document.createElement('div');
      div.innerHTML = html;
      const parentOfTable = accountTable.parentElement;
      parentOfTable.replaceChild(div.firstChild, accountTable);
    }
    return searchResult;
  };

  searchButton.click(e => {
    e.preventDefault();
    searchFunction();
  });

  $('#searchAccountInput').on('keypress', e => {
    if (e.which === 13) {
      e.preventDefault();
      searchFunction();
    }
  });
};

addOrUpdateAccount();
searchAccount();
printAccountTable();

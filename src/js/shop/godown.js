/* eslint-disable no-console */
/* eslint-disable no-undef */
/*eslint-env browser*/

const addOrUpdateGodown = () => {
  const modalTitle = $('#addGodownModalTitle');
  const addGodownForm = $('#addGodownForm');
  const errorAlert = $('#errorAddGodown');
  const addButton = $('#godownSaveButton');

  const updatedGodown = {};

  const setupUpdateModal = () => {
    modalTitle.html('Update Godown');
    addButton.html('Update');
    addButton.attr('disabled', true);
  };

  $(document).on('click', '.addGodownButton', () => {
    if (page === 'Godown') {
      const setupAddModal = () => {
        modalTitle.html('Add Godown');
        addButton.html('Add');

        addButton.attr('disabled', false);
      };
      setupAddModal();
      const addGodownModal = $('#addGodownModal');
      addGodownModal.modal('show');
    }
  });

  const fillForm = btn => {
    const godownName = btn.dataset.godownname;

    const godown = godowns.find(elem => elem.godown_name === godownName);

    updatedGodown.prevName = godown.godown_name;

    $('#godownName').val(godown.godown_name);
    $('#godownAddress').val(godown.address);
  };

  $(document).on('click', '.updateGodownButton', function() {
    setupUpdateModal();
    fillForm(this);
  });

  addGodownForm.on('input', function(e) {
    e.preventDefault();
    addButton.attr('disabled', false);
  });

  addGodownForm.on('submit', async function(e) {
    e.preventDefault();

    if (modalTitle.html() === 'Add Godown') {
      errorAlert.hoise = false;
      const godown = {};

      godown.name = $('#godownName').val();
      godown.address = $('#godownAddress').val();

      for (let i = 0; i < godowns.length; i += 1) {
        if (godowns[i].godown_name === godown.name) {
          errorAlert.show();
          errorAlert.hoise = true;
        }
      }
      if (!errorAlert.hoise) {
        try {
          const axiosRes = await axios({
            method: 'post',
            url: `http://127.0.0.1:3000/api/v1/godown/`,
            responseType: 'json',
            data: {
              godown
            }
          });
          message = axiosRes;
          console.log(message);
        } catch (error) {
          console.log(error.stack);
        }
      }
    } else if (modalTitle.html() === 'Update Godown') {
      errorAlert.hoise = false;

      updatedGodown.name = $('#godownName').val();
      updatedGodown.address = $('#godownAddress').val();

      for (let i = 0; i < godowns.length; i += 1) {
        if (godowns[i].godown_name === updatedGodown.name) {
          errorAlert.show();
          errorAlert.hoise = true;
        }
      }
      console.log(updatedGodown);
      if (!errorAlert.hoise) {
        try {
          const axiosRes = await axios({
            method: 'patch',
            url: `http://127.0.0.1:3000/api/v1/godown/`,
            responseType: 'json',
            data: {
              updatedGodown
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
      $('#addGodownModal').modal('hide');
    });
    window.location.reload(true);
  });

  const clearFormOnClose = () => {
    $('#addGodownModal').on('hidden.bs.modal', function(e) {
      e.preventDefault();

      $('#godownName').val('');
      $('#godownAddress').val('');
      errorAlert.hide();
    });
  };

  clearFormOnClose();
};

const printGodownTable = () => {
  const printTableButton = document.querySelector('#printTableButton');
  printTableButton.addEventListener('click', e => {
    e.preventDefault();
    printJS({
      printable: 'tableDiv',
      type: 'html',
      header: 'Godown Table',
      style: `#godownTable tr td:nth-child(1), #godownTable th:nth-child(1) {
              display: none
            } 
            #godownTable {
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

const searchGodown = () => {
  const searchButton = $('#searchGodownButton');

  const searchFunction = () => {
    const options = {
      keys: [],
      threshold: 0.2
    };

    const fuse = new Fuse(godowns, options);

    const searchBy = document.querySelector('#searchBy');
    const searchGodownInput = document.querySelector('#searchGodownInput');

    if (searchBy.value === 'Name') {
      options.keys.push('godown_name');
    } else if (searchBy.value === 'Address') {
      options.keys.push('address');
    }
    const searchResult = fuse.search(searchGodownInput.value);
    if (searchResult.length !== 0) {
      const godownTable = document.querySelector('#godownTable');
      const html = window.renderGodownTable({ godowns: searchResult });
      const div = document.createElement('div');
      div.innerHTML = html;
      const parentOfTable = godownTable.parentElement;
      parentOfTable.replaceChild(div.firstChild, godownTable);
    }
    return searchResult;
  };

  searchButton.click(e => {
    e.preventDefault();
    searchFunction();
  });

  $('#searchGodownInput').on('keypress', e => {
    if (e.which === 13) {
      e.preventDefault();
      searchFunction();
    }
  });
};

addOrUpdateGodown();
searchGodown();
printGodownTable();

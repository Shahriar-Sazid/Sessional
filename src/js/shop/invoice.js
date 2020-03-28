/* eslint-disable no-console */
/* eslint-disable no-undef */
/*eslint-env browser*/

const printInvoiceTable = () => {
  const printTableButton = document.querySelector('#printTableButton');
  printTableButton.addEventListener('click', e => {
    e.preventDefault();
    printJS({
      printable: 'tableDiv',
      type: 'html',
      header: 'Invoice Table',
      style: `#invoiceTable tr td:nth-child(1), #invoiceTable th:nth-child(1) {
                display: none
              } 
              #invoiceTable {
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

const searchInvoice = () => {
  const searchButton = $('#searchInvoiceButton');

  const searchFunction = () => {
    const options = {
      keys: [],
      threshold: 0.2
    };

    const fuse = new Fuse(invoices, options);

    const searchBy = document.querySelector('#searchBy');
    const searchInvoiceInput = document.querySelector('#searchInvoiceInput');

    if (searchBy.value === 'Name') {
      options.keys.push('invoice_name');
    } else if (searchBy.value === 'Bank') {
      options.keys.push('bank');
    }
    const searchResult = fuse.search(searchInvoiceInput.value);
    if (searchResult.length !== 0) {
      const invoiceTable = document.querySelector('#invoiceTable');
      const html = window.renderInvoiceTable({ invoices: searchResult });
      const div = document.createElement('div');
      div.innerHTML = html;
      const parentOfTable = invoiceTable.parentElement;
      parentOfTable.replaceChild(div.firstChild, invoiceTable);
    }
    return searchResult;
  };

  searchButton.click(e => {
    e.preventDefault();
    searchFunction();
  });

  $('#searchInvoiceInput').on('keypress', e => {
    if (e.which === 13) {
      e.preventDefault();
      searchFunction();
    }
  });
};

searchInvoice();
printInvoiceTable();

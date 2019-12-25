function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function renderSupplierTable(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (suppliers) {;pug_debug_line = 1;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctable class=\"table table-responsive-sm table-bordered table-striped table-sm table-light\" id=\"supplierTable\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Cthead\u003E";
;pug_debug_line = 3;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 4;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Cth style=\"width:50px;\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "Edit\u003C\u002Fth\u003E";
;pug_debug_line = 5;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 5;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "Name\u003C\u002Fth\u003E";
;pug_debug_line = 6;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 6;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "Company\u003C\u002Fth\u003E";
;pug_debug_line = 7;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 7;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "Address\u003C\u002Fth\u003E";
;pug_debug_line = 8;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 8;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "Mobile No(1)\u003C\u002Fth\u003E";
;pug_debug_line = 9;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 9;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "Mobile No(2)\u003C\u002Fth\u003E";
;pug_debug_line = 10;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 10;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "Telephone\u003C\u002Fth\u003E";
;pug_debug_line = 11;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 11;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "Email\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003C\u002Fthead\u003E";
;pug_debug_line = 12;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctbody\u003E";
;pug_debug_line = 13;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
// iterate suppliers
;(function(){
  var $$obj = suppliers;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var supplier = $$obj[pug_index0];
;pug_debug_line = 14;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 15;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 16;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Cbutton" + (" class=\"updateSupplierButton btn btn-light\""+" type=\"button\" data-toggle=\"modal\" data-target=\"#addSupplierModal\""+pug_attr("data-supplierName", supplier.supplier_name, true, false)) + "\u003E";
;pug_debug_line = 17;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ci class=\"cui-pencil\"\u003E\u003C\u002Fi\u003E\u003C\u002Fbutton\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 18;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 18;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = supplier.supplier_name) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 19;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 19;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = supplier.company_name) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 20;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 20;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = supplier.address) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 21;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 21;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = supplier.mobile_no_1) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 22;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 22;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = supplier.mobile_no_2) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 23;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 23;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = supplier.telephone_no) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 24;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 24;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = supplier.email) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var supplier = $$obj[pug_index0];
;pug_debug_line = 14;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 15;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 16;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Cbutton" + (" class=\"updateSupplierButton btn btn-light\""+" type=\"button\" data-toggle=\"modal\" data-target=\"#addSupplierModal\""+pug_attr("data-supplierName", supplier.supplier_name, true, false)) + "\u003E";
;pug_debug_line = 17;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ci class=\"cui-pencil\"\u003E\u003C\u002Fi\u003E\u003C\u002Fbutton\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 18;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 18;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = supplier.supplier_name) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 19;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 19;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = supplier.company_name) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 20;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 20;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = supplier.address) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 21;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 21;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = supplier.mobile_no_1) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 22;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 22;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = supplier.mobile_no_2) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 23;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 23;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = supplier.telephone_no) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 24;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 24;pug_debug_filename = "C:\\Users\\shahr\\Dropbox\\Shop-dev\\_views\\_supplierTable.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = supplier.email) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";}.call(this,"suppliers" in locals_for_with?locals_for_with.suppliers:typeof suppliers!=="undefined"?suppliers:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}
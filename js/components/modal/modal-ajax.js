(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(['require', './modal-ajax-no-footer', './modal'], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require);
  }
})(this, function(require) {

var ModalAjaxNoFooter = require('./modal-ajax-no-footer');
var Modal = require('./modal');
    return ModalAjaxNoFooter.extend({
        modal: Modal
    });
});
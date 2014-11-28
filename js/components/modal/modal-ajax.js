(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(['./modal-ajax-no-footer', './modal'], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(
            require('./modal-ajax-no-footer'),
            require('./modal')
        );
    }
})(this, function(ModalAjaxNoFooter, Modal) {

    var ModalAjaxNoFooter = require('./modal-ajax-no-footer');
    var Modal = require('./modal');
    return ModalAjaxNoFooter.extend({
        modal: Modal
    });
});
define([
    'marionette-components/components/modal/modal-ajax-no-footer',
    'marionette-components/components/modal/modal'
], function(
    ModalAjaxNoFooter,
    Modal
) {
    return ModalAjaxNoFooter.extend({
        modal: Modal
    });
});
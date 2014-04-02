define([
    'components/modal/modal-ajax-no-footer',
    'components/modal/modal'
], function(
    ModalAjaxNoFooter,
    Modal
) {
    return ModalAjaxNoFooter.extend({
        modal: Modal
    });
});
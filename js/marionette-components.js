define([
    './components/modal/modal',
    './components/modal/modal-no-footer',
    './components/modal/modal-ajax',
    './components/modal/modal-ajax-no-footer',
    './components/modal/views/modal-no-footer-view',
    './components/modal/views/modal-view',
    './components/modal/views/modal-header-view',
    './components/modal/views/modal-buttons-footer-view'
], function(
    Modal,
    ModalNoFooter,
    ModalAjax,
    ModalAjaxNoFooter,
    ModalNoFooterView,
    ModalView,
    ModalHeaderView,
    ModalButtonsFooterView
) {
    return {
        Modal: Modal,
        ModalNoFooter: ModalNoFooter,
        ModalAjax: ModalAjax,
        ModalAjaxNoFooter: ModalAjaxNoFooter,
        ModalNoFooterView: ModalNoFooterView,
        ModalView: ModalView,
        ModalHeaderView: ModalHeaderView,
        ModalButtonsFooterView: ModalButtonsFooterView
    };
});
define([
    'marionette-components/components/modal/modal',
    'marionette-components/components/modal/modal-no-footer',
    'marionette-components/components/modal/modal-ajax',
    'marionette-components/components/modal/modal-ajax-no-footer',
    'marionette-components/components/modal/views/modal-no-footer-view',
    'marionette-components/components/modal/views/modal-view',
    'marionette-components/components/modal/views/modal-header-view',
    'marionette-components/components/modal/views/modal-buttons-footer-view',
    'marionette-components/components/notifier/notifier',
], function(
    Modal,
    ModalNoFooter,
    ModalAjax,
    ModalAjaxNoFooter,
    ModalNoFooterView,
    ModalView,
    ModalHeaderView,
    ModalButtonsFooterView,
    Notifier
) {
    return {
        Modal: Modal,
        ModalNoFooter: ModalNoFooter,
        ModalAjax: ModalAjax,
        ModalAjaxNoFooter: ModalAjaxNoFooter,
        ModalNoFooterView: ModalNoFooterView,
        ModalView: ModalView,
        ModalHeaderView: ModalHeaderView,
        ModalButtonsFooterView: ModalButtonsFooterView,
        Notifier: Notifier
    };
});
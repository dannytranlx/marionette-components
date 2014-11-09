(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([
            './components/modal/modal',
            './components/modal/modal-no-footer',
            './components/modal/modal-ajax',
            './components/modal/modal-ajax-no-footer',
            './components/modal/views/modal-no-footer-view',
            './components/modal/views/modal-view',
            './components/modal/views/modal-header-view',
            './components/modal/views/modal-buttons-footer-view'
        ], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(
            require('./components/modal/modal'),
            require('./components/modal/modal-no-footer'),
            require('./components/modal/modal-ajax'),
            require('./components/modal/modal-ajax-no-footer'),
            require('./components/modal/views/modal-no-footer-view'),
            require('./components/modal/views/modal-view'),
            require('./components/modal/views/modal-header-view'),
            require('./components/modal/views/modal-buttons-footer-view')
        );
    }
})(this, function(
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
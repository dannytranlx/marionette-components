(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(['underscore', 'jquery', 'marionette', './modal-bare-view', 'hbs!../templates/modal-no-footer-template'], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(
            require('underscore'),
            require('jquery'),
            require('backbone.marionette'),
            require('./modal-bare-view'),
            require('../templates/modal-no-footer-template.hbs')
        );
    }
})(this, function(_, $, Marionette, ModalBareView, ModalNoFooterTemplate) {

    return ModalBareView.extend({
        template: ModalNoFooterTemplate,

        regions:  {
            header: '[data-region-header]',
            content: '[data-region-content]'
        }
    });
});
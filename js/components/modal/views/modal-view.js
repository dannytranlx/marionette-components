(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(['underscore', 'marionette', './modal-no-footer-view', 'hbs!../templates/modal-template'], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(
            require('underscore'),
            require('backbone.marionette'),
            require('./modal-no-footer-view'),
            require('../templates/modal-template.hbs')
        );
    }
})(this, function(_, Marionette, ModalNoFooterView, ModalTemplate) {

    return ModalNoFooterView.extend({
        template: ModalTemplate,

        regions:  {
            header: 'header',
            content: 'section',
            footer: 'footer'
        }
    });
});
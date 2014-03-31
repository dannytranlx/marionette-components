define([
    'underscore',
    'marionette',
    'components/modal/views/modal-no-footer-view',
    'hbs!templates/modal/modal-template'
], function(
    _,
    Marionette,
    ModalNoFooterView,
    ModalTemplate
) {
    return ModalNoFooterView.extend({
        template: ModalTemplate,
        className: 'modal',

        regions:  {
            header: 'header',
            content: '.modal-body',
            footer: '.modal-footer'
        },

        initialize: function(options) {
            ModalNoFooterView.prototype.initialize.call(this, options);
        }
    });
});
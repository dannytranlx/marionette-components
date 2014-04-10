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
        className: 'mc-modal-dialog',

        regions:  {
            header: 'header',
            content: 'section',
            footer: 'footer'
        },

        initialize: function(options) {
            ModalNoFooterView.prototype.initialize.call(this, options);
        }
    });
});
define([
    'underscore',
    'marionette',
    'marionette-components/components/modal/views/modal-no-footer-view',
    'hbs!marionette-components/templates/modal/modal-template'
], function(
    _,
    Marionette,
    ModalNoFooterView,
    ModalTemplate
) {
    return ModalNoFooterView.extend({
        template: ModalTemplate,

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
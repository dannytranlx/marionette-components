define([
    'underscore',
    'marionette',
    'hbs!templates/modal/modal-template'
], function(
    _,
    Marionette,
    ModalTemplate
) {
    return Marionette.Layout.extend({
        template: ModalTemplate,
        className: 'modal',

        regions:  {
            header: 'header',
            content: 'section'
        }
    });
});

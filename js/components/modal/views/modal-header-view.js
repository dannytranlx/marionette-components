define([
    'underscore',
    'marionette',
    'hbs!marionette-components/templates/modal/modal-header-template'
], function(
    _,
    Marionette,
    ModalNoFooterTemplate
) {
    return Marionette.ItemView.extend({
        template: ModalNoFooterTemplate,
        title: '',

        serializeData: function() {
            return {
                title: Marionette.getOption(this, 'title')
            };
        }
    });
});

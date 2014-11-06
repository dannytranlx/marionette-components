(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(['underscore', 'marionette', 'hbs!../templates/modal/modal-header-template'], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(
            require('underscore'),
            require('backbone.marionette'),
            require('../templates/modal/modal-header-template.hbs')
        );
    }
})(this, function(_, Marionette, ModalNoFooterTemplate) {

    return Marionette.ItemView.extend({
        template: ModalNoFooterTemplate,
        title: '',

        serializeData: function() {
            return {
                title: this.getOption('title')
            };
        }
    });
});
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(['underscore', 'marionette', 'hbs!../templates/modal-buttons-footer-template'], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(
            require('underscore'),
            require('backbone.marionette'),
            require('../templates/modal-buttons-footer-template.hbs')
        );
    }
})(this, function(_, Marionette, ModalButtonsFooterTemplate) {
    return Marionette.ItemView.extend({
        getOption: Marionette.proxyGetOption,
        template: ModalButtonsFooterTemplate,

        ui: {
            primaryAction: '[data-primary]',
            secondaryAction: '[data-secondary]',
            tertiaryAction: '[data-tertiary]'
        },

        triggers: {
            'click @ui.primaryAction' : 'modal:primary-click',
            'click @ui.secondaryAction' : 'modal:secondary-click',
            'click @ui.tertiaryAction' : 'modal:tertiary-click'
        },

        primaryActionText: 'OK',
        primaryTagName: 'button',
        primaryClassName: 'btn btn-primary',
        secondaryActionText: 'Close',
        secondaryTagName: 'button',
        secondaryClassName: 'btn',
        tertiaryActionText: 'Action',
        tertiaryTagName: 'button',
        tertiaryClassName: 'btn',
        primaryFirst: false,
        hasSecondary: true,
        hasTertiary: false,


        serializeData: function() {
            return {
                primaryActionText: this.getOption('primaryActionText'),
                primaryTagName: this.getOption('primaryTagName'),
                primaryClassName: this.getOption('primaryClassName'),
                secondaryActionText: this.getOption('secondaryActionText'),
                secondaryTagName: this.getOption('secondaryTagName'),
                secondaryClassName: this.getOption('secondaryClassName'),
                tertiaryActionText: this.getOption('tertiaryActionText'),
                tertiaryTagName: this.getOption('tertiaryTagName'),
                tertiaryClassName: this.getOption('tertiaryClassName'),
                primaryFirst: this.getOption('primaryFirst'),
                hasSecondary: this.getOption('hasSecondary'),
                hasTertiary: this.getOption('hasTertiary')
            };
        }
    });
});
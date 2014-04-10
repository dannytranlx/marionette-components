define([
    'underscore',
    'marionette',
    'hbs!marionette-components/templates/modal/modal-buttons-footer-template'
], function(
    _,
    Marionette,
    ModalButtonsFooterTemplate
) {
    return Marionette.ItemView.extend({
        template: ModalButtonsFooterTemplate,

        ui: {
            primaryAction: '[data-primary]',
            secondaryAction: '[data-secondary]',
        },

        triggers: {
            'click @ui.primaryAction' : 'modal:primary-click',
            'click @ui.secondaryAction' : 'modal:secondary-click'
        },

        primaryActionText: 'OK',
        primaryTagName: 'button',
        primaryClassName: 'btn btn-primary',
        secondaryActionText: 'Close',
        secondaryTagName: 'button',
        secondaryClassName: 'btn',
        primaryFirst: false,
        hasSecondary: true,


        serializeData: function() {
            return {
                primaryActionText: Marionette.getOption(this, 'primaryActionText'),
                primaryTagName: Marionette.getOption(this, 'primaryTagName'),
                primaryClassName: Marionette.getOption(this, 'primaryClassName'),
                secondaryActionText: Marionette.getOption(this, 'secondaryActionText'),
                secondaryTagName: Marionette.getOption(this, 'secondaryTagName'),
                secondaryClassName: Marionette.getOption(this, 'secondaryClassName'),
                primaryFirst: Marionette.getOption(this, 'primaryFirst'),
                hasSecondary: Marionette.getOption(this, 'hasSecondary')
            };
        }
    });
});

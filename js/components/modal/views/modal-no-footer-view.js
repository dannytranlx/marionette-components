define([
    'underscore',
    'jquery',
    'marionette',
    'hbs!marionette-components/templates/modal/modal-no-footer-template'
], function(
    _,
    $,
    Marionette,
    ModalNoFooterTemplate
) {
    return Marionette.Layout.extend({
        template: ModalNoFooterTemplate,

        tagName: 'div',

        className: 'mc-modal',

        regions:  {
            header: 'header',
            content: 'section'
        },

        ui: {
            closeButton: 'button[data-dismiss]'
        },

        events: {
            'click @ui.closeButton': 'onCloseButtonClick'
        },

        initialize: function() {
            _.bindAll(this,
                'onShown',
                'onHidden',
                'onCloseButtonClick',
                'onModalBackdropClick'
            );

            this.backdrop = $('<div class="mc-modal-backdrop" />');

            this.on('modal:shown', this.onShown);
            this.on('modal:hidden', this.onHidden);
        },

        onShown: function() {},
        onHidden: function() {},

        show: function() {
            this.$el
                .addClass('in')
                .attr('aria-hidden', false);

            this.$el
                .show()
                .scrollTop(0);

            this.$el.before(this.backdrop);

            this.backdrop.on('click', this.onModalBackdropClick);
            this.backdrop.addClass('in')

            this.trigger('modal:shown');
        },

        hide: function() {
            this.$el
                .removeClass('in')
                .attr('aria-hidden', true)
                .hide();

            this.backdrop.removeClass('in');
            this.backdrop.off('click', this.onModalBackdropClick);

            this.backdrop.remove();

            this.trigger('modal:hidden');
        },

        onCloseButtonClick: function(event) {
            this.hide();

            event.preventDefault();
            event.stopPropagation();
        },

        onModalBackdropClick: function(event) {
            this.hide();

            event.preventDefault();
            event.stopPropagation();
        }
    });
});
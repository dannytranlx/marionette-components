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

        tagName: 'aside',

        className: 'mc-modal',

        regions: {
            header: 'header',
            content: 'section'
        },

        ui: {
            closeButton: '.mc-close-button'
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
                .attr('aria-hidden', false);

            this.$el
                .show()
                .scrollTop(0);

            this.$el.before(this.backdrop);

            this.backdrop.on('click', this.onModalBackdropClick);

            this.center();

            this.trigger('modal:shown');
        },

        hide: function() {
            this.$el
                .attr('aria-hidden', true)
                .hide();

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
        },

        /**
         * Centers the modal in the page
         */
        center: function() {
            this.$el.css('margin-left', this.$el.width() / 2 * -1);
        },
    });
});

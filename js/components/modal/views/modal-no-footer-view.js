(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(['underscore', 'jquery', 'marionette', 'hbs!../templates/modal-no-footer-template'], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(
            require('underscore'),
            require('jquery'),
            require('backbone.marionette'),
            require('../templates/modal-no-footer-template.hbs')
        );
    }
})(this, function(_, $, Marionette, ModalNoFooterTemplate) {

    return Marionette.LayoutView.extend({
        template: ModalNoFooterTemplate,

        tagName: 'div',

        className: 'modal fade',

        regions:  {
            header: 'header',
            content: '.modal-body'
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

            this.backdrop = $('<div class="modal-backdrop fade" />');

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

            this.listenTo(this.backdrop, 'click', this.onModalBackdropClick);
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
            event.preventDefault();
            event.stopPropagation();

            this.hide();
        },

        onModalBackdropClick: function(event) {
            event.preventDefault();
            event.stopPropagation();

            this.hide();
        }
    });
});
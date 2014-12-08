(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(['underscore', 'jquery', 'marionette', 'hbs!../templates/modal-bare-template'], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(
            require('underscore'),
            require('jquery'),
            require('backbone.marionette'),
            require('../templates/modal-bare-template.hbs')
        );
    }
})(this, function(_, $, Marionette, ModalBareTemplate) {

    return Marionette.LayoutView.extend({
        template: ModalBareTemplate,

        tagName: 'div',

        className: 'modal fade',

        regions:  {
            content: '[data-region-content]'
        },

        ui: {
            closeButton: 'button[data-dismiss]'
        },

        events: {
            'click @ui.closeButton': 'onCloseButtonClick'
        },

        initialize: function() {
            _.bindAll(this,
                'onModalShown',
                'onModalHidden',
                'onCloseButtonClick',
                'onModalBackdropClick'
            );

            this.backdrop = $('<div class="modal-backdrop fade" />');
        },

        onModalShown: function() {},
        onModalHidden: function() {},

        show: function() {
            this.$el
                .addClass('in')
                .attr('aria-hidden', false);

            this.$el
                .show()
                .scrollTop(0);

            this.$el.prepend(this.backdrop);

            this.backdrop.on('click', this.onModalBackdropClick);

            this.backdrop.addClass('in');

            this.triggerMethod('modal:shown', this);
        },

        hide: function() {
            this.$el
                .removeClass('in')
                .attr('aria-hidden', true)
                .hide();

            this.backdrop.removeClass('in');

            this.backdrop.off().remove();

            this.triggerMethod('modal:hidden', this);
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
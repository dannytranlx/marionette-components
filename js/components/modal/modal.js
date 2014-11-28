(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([
                'underscore',
                'marionette',
                './modal-no-footer',
                './views/modal-view',
                './views/modal-buttons-footer-view',
                '../../utils/errors'
            ],
            factory);
    } else if (typeof exports === "object") {
        module.exports = factory(
            require('underscore'),
            require('backbone.marionette'),
            require('./modal-no-footer'),
            require('./views/modal-view'),
            require('./views/modal-buttons-footer-view'),
            require('../../utils/errors')
        );
    }
})(this, function(_, Marionette, ModalNoFooter, ModalView, ModalButtonsFooterView, ErrorsUtils) {

    return ModalNoFooter.extend({
        modalView: ModalView,

        footerView: ModalButtonsFooterView,

        footerViewOptions: {},

        initialize: function(options) {
            ModalNoFooter.prototype.initialize.call(this, options);

            _.bindAll(this,
                'onPrimaryClick',
                'onSecondaryClick',
                'onTertiaryClick'
            );
        },

        getFooterView: function() {
            var footerView = Marionette.getOption(this, 'footerView');

            if (!footerView) {
                ErrorsUtils.throwError('A `footerView` must be specified', 'NoFooterViewError');
            }

            return footerView;
        },

        buildFooterView: function() {
            var view = this.footerViewInstance || Marionette.getOption(this, 'footerViewInstance');

            if (!view) {
                var footerViewOptions = Marionette.getOption(this, 'footerViewOptions');
                if (_.isFunction(footerViewOptions)) {
                    footerViewOptions = footerViewOptions.call(this);
                }

                var FooterView = this.getFooterView();

                view = new FooterView(footerViewOptions);
                this.footerViewInstance = view;
            }
            this.bindFooterViewEvents(view);


            return view;
        },

        bindFooterViewEvents: function(view) {
            var primaryClickFunction = Marionette.getOption(this, 'onPrimaryClick');
            var secondaryClickFunction = Marionette.getOption(this, 'onSecondaryClick');
            var hasSecondary = Marionette.getOption(view, 'hasSecondary');

            this.listenTo(view, 'modal:primary-click', primaryClickFunction);

            if (hasSecondary) {
                this.listenTo(view, 'modal:secondary-click', secondaryClickFunction);
            }
        },

        swapFooterView: function(view) {
            this.stopListening('modal:primary-click');
            this.stopListening('modal:secondary-click');

            this.footerViewInstance = view;
            this.bindFooterViewEvents(view);
            this.modalViewInstance.footer.show(view);
        },

        hideFooterView: function() {
            this.modalViewInstance.footer.reset();
        },

        onPrimaryClick: function() {},

        onSecondaryClick: function() {
            this.hide();
        },

        onTertiaryClick: function() {},

        renderModal: function() {
            if (!this.modalViewInstance) {
                this.modalViewInstance = ModalNoFooter.prototype.renderModal.call(this);
                this.modalViewInstance.on('render', _.bind(function() {
                    this.footerViewInstance = this.buildFooterView();
                    this.modalViewInstance.footer.show(this.footerViewInstance);
                }, this));
            }

            return this.modalViewInstance;
        },

        focusPrimary: function() {
            if (this.footerViewInstance) {
                this.footerViewInstance.ui.primaryAction.focus();
            }
        }
    });
});
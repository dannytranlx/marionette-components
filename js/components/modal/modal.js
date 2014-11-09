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
            require('./view/modal-buttons-footer-view'),
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
                'onSecondaryClick'
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
            var view = this.footerViewInstance;
            if (!view) {
                var footerViewOptions = Marionette.getOption(this, 'footerViewOptions');
                if (_.isFunction(footerViewOptions)) {
                    footerViewOptions = footerViewOptions.call(this);
                }

                var FooterView = this.getFooterView();

                view = new FooterView(footerViewOptions);
                this.bindFooterViewEvents(view);
            }


            return view;
        },

        bindFooterViewEvents: function(view) {
            var primaryClickFunction = Marionette.getOption(this, 'onPrimaryClick');
            var secondaryClickFunction = Marionette.getOption(this, 'onSecondaryClick');
            var hasSecondary = Marionette.getOption(view, 'hasSecondary');

            view.on('modal:primary-click', primaryClickFunction);

            if (hasSecondary) {
                view.on('modal:secondary-click', secondaryClickFunction);
            }
        },

        onPrimaryClick: function() {},

        onSecondaryClick: function() {
            this.hide();
        },

        renderModal: function() {
            var modalView = ModalNoFooter.prototype.renderModal.call(this);
            modalView.on('render', _.bind(function() {
                this.footerViewInstance = this.buildFooterView();
                modalView.footer.show(this.footerViewInstance);
            }, this));

            return modalView;
        },
    });
});
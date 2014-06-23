define([
    'underscore',
    'marionette',
    'marionette-components/components/modal/modal-no-footer',
    'marionette-components/components/modal/views/modal-view',
    'marionette-components/components/modal/views/modal-buttons-footer-view',
    'marionette-components/utils/errors'
], function(
    _,
    Marionette,
    ModalNoFooter,
    ModalView,
    ModalButtonsFooterView,
    ErrorsUtils
) {
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
            var view = this.footerViewInstance || Marionette.getOption(this, 'footerViewInstance');

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
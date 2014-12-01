(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([
            'jquery',
            'underscore',
            'marionette',
            './modal-bare',
            './views/modal-no-footer-view',
            './views/modal-header-view',
            './views/modal-html-content-view',
            '../../utils/errors'
        ], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(
            require('jquery'),
            require('underscore'),
            require('backbone.marionette'),
            require('./modal-bare'),
            require('./views/modal-no-footer-view'),
            require('./views/modal-header-view'),
            require('./views/modal-html-content-view'),
            require('../../utils/errors')
        );
    }
})(this, function($, _, Marionette, ModalBare, ModalNoFooterView, ModalHeaderView, ModalHtmlContentView, ErrorsUtils) {

     return ModalBare.extend({
        modalView: ModalNoFooterView,

        headerView: ModalHeaderView,
        headerViewOptions: {},

        getHeaderView: function() {
            var headerView = this.getOption('headerView');

            if (!headerView) {
                ErrorsUtils.throwError('A `headerView` must be specified', 'NoHeaderViewError');
            }

            return headerView;
        },

        buildHeaderView: function() {
            var view = this.headerViewInstance || this.getOption('headerViewInstance');

            if (!view) {
                var headerViewOptions = this.getOption('headerViewOptions');

                if (_.isFunction(headerViewOptions)) {
                    headerViewOptions = headerViewOptions.call(this);
                }

                var HeaderView = this.getHeaderView();

                view = new HeaderView(headerViewOptions);

                this.bindHeaderViewEvents(view);
            }
            return view;
        },

        swapHeaderView: function(view) {
            this.headerViewInstance = view;
            this.modalViewInstance.header.show(view);
        },

        bindHeaderViewEvents: function() {},

        renderModal: function() {
            if (!this.modalViewInstance) {
                this.modalViewInstance = ModalBare.prototype.renderModal.call(this);
                this.listenTo(this.modalViewInstance, 'render', _.bind(function() {
                    this.headerViewInstance = this.buildHeaderView();
                    this.modalViewInstance.header.show(this.headerViewInstance);
                }, this));
            }

            return this.modalViewInstance;
        }
    });
});
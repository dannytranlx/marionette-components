(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([
            'jquery',
            'underscore',
            'marionette',
            './views/modal-bare-view',
            './views/modal-html-content-view',
            '../../utils/errors'
        ], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(
            require('jquery'),
            require('underscore'),
            require('backbone.marionette'),
            require('./views/modal-bare-view'),
            require('./views/modal-html-content-view'),
            require('../../utils/errors')
        );
    }
})(this, function($, _, Marionette, ModalBareView, ModalHtmlContentView, ErrorsUtils) {

     return Marionette.Controller.extend({
        destroyOnHidden: true,

        container: 'body',

        transitionDuration: 300,

        modalView: ModalBareView,
        modalViewOptions: function () {
            return {
                transitionDuration: this.getOption('transitionDuration')
            };
        },

        contentView: ModalHtmlContentView,
        contentViewOptions: {},

        initialize: function(options) {
            this.isOpened = false;

            _.bindAll(this,
                'onModalHidden',
                'onModalShown'
            );
        },

        getContainer: function() {
            var container = this.getOption('container');

            if (!container) {
                ErrorsUtils.throwError('A `container` must be specified', 'NoContainerError');
            }

            return $(container);
        },

        getModalView: function() {
            var modalView = this.getOption('modalView');

            if (!modalView) {
                ErrorsUtils.throwError('A `modalView` must be specified', 'NoModalViewError');
            }

            return modalView;
        },

        buildModalView: function() {
            var view = this.modalViewInstance || this.getOption('modalViewInstance');

            if (!view) {
                var modalViewOptions = this.getOption('modalViewOptions') || {};

                if (_.isFunction(modalViewOptions)) {
                    modalViewOptions = modalViewOptions.call(this);
                }

                var ModalView = this.getModalView();

                view = new ModalView(modalViewOptions);

                this.bindModalViewEvents(view);
            }
            return view;
        },

        getContentView: function() {
            var contentView = this.getOption('contentView');

            if (!contentView) {
                ErrorsUtils.throwError('A `contentView` must be specified', 'NoContentViewError');
            }

            return contentView;
        },

        buildContentView: function() {
            var view = this.contentViewInstance || this.getOption('contentViewInstance');

            if (!view) {
                var contentViewOptions = this.getOption('contentViewOptions');

                if (_.isFunction(contentViewOptions)) {
                    contentViewOptions = contentViewOptions.call(this);
                }

                var ContentView = this.getContentView();

                view = new ContentView(contentViewOptions);

                this.bindContentViewEvents(view);
            }

            return view;
        },

        swapContentView: function(view) {
            this.contentViewInstance = view;
            this.modalViewInstance.content.show(view);
        },

        bindModalViewEvents: function(view) {
            var destroyOnHidden = this.getOption('destroyOnHidden');

            if (destroyOnHidden) {
                this.listenTo(view, 'modal:hidden', this.destroyModalOnHide);
            }

            var modalHiddenCallback = this.getOption('onModalHidden');
            var modalShownCallback = this.getOption('onModalShown');

            this.listenTo(view, 'modal:hidden', modalHiddenCallback);
            this.listenTo(view, 'modal:shown', modalShownCallback);
        },
        bindContentViewEvents: function() {},

        hide: function() {
            if (this.isOpened) {
                this.modalViewInstance.hide();
                this.isOpened = false;
            }
        },

        destroyModalOnHide: function() {
            this.modalViewInstance.destroy();
            this.destroy();
        },

        onModalHidden: function() {},

        onModalShown: function() {},

        renderModal: function() {
            if (!this.modalViewInstance) {
                this.modalViewInstance = this.buildModalView();
                this.contentViewInstance = this.buildContentView();

                this.listenTo(this.modalViewInstance, 'render', _.bind(function() {
                    this.modalViewInstance.content.show(this.contentViewInstance);
                }, this));
            }

            return this.modalViewInstance;
        },

        show: function() {
            if (!this.isOpened) {
                var view = this.renderModal();
                view.render();

                var container = this.getContainer();
                container.append(view.el);

                view.show();
                this.isOpened = true;
            }
        }
    });
});
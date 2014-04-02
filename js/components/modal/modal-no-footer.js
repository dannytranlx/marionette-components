define([
    'jquery',
    'underscore',
    'marionette',
    'components/modal/views/modal-no-footer-view',
    'components/modal/views/modal-header-view',
    'components/modal/views/modal-html-content-view',
    'utils/errors'
], function(
    $,
    _,
    Marionette,
    ModalNoFooterView,
    ModalHeaderView,
    ModalHtmlContentView,
    ErrorsUtils
) {
    return Marionette.Controller.extend({

        closeOnHidden: true,

        container: 'body',

        modalView: ModalNoFooterView,
        modalViewOptions: {},

        contentView: ModalHtmlContentView,
        contentViewOptions: {},

        headerView: ModalHeaderView,
        headerViewOptions: {},

        initialize: function(options) {
            this.isOpened = false;

            _.bindAll(this,
                'onModalHidden',
                'onModalShown'
            );
        },

        getContainer: function() {
            var container = Marionette.getOption(this, 'container');

            if (!container) {
                ErrorsUtils.throwError('A `container` must be specified', 'NoContainerError');
            }

            return $(container);
        },

        getModalView: function() {
            var modalView = Marionette.getOption(this, 'modalView');

            if (!modalView) {
                ErrorsUtils.throwError('A `modalView` must be specified', 'NoModalViewError');
            }

            return modalView;
        },

        buildModalView: function() {
            var view = this.modalViewInstance;

            if (!view) {
                var modalViewOptions = Marionette.getOption(this, 'modalViewOptions') || {};

                if (_.isFunction(modalViewOptions)) {
                    modalViewOptions = modalViewOptions.call(this);
                }

                var ModalView = this.getModalView();

                view = new ModalView(modalViewOptions);

                this.bindModalViewEvents(view);
            }
            return view;
        },

        getHeaderView: function() {
            var headerView = Marionette.getOption(this, 'headerView');

            if (!headerView) {
                ErrorsUtils.throwError('A `headerView` must be specified', 'NoHeaderViewError');
            }

            return headerView;
        },

        buildHeaderView: function() {
            var view = this.headerViewInstance;

            if (!view) {
                var headerViewOptions = Marionette.getOption(this, 'headerViewOptions');

                if (_.isFunction(headerViewOptions)) {
                    headerViewOptions = headerViewOptions.call(this);
                }

                var HeaderView = this.getHeaderView();

                view = new HeaderView(headerViewOptions);

                this.bindHeaderViewEvents(view);
            }
            return view;
        },

        getContentView: function() {
            var contentView = Marionette.getOption(this, 'contentView');

            if (!contentView) {
                ErrorsUtils.throwError('A `contentView` must be specified', 'NoContentViewError');
            }

            return contentView;
        },

        buildContentView: function() {
            var view = this.contentViewInstance;

            if (!view) {
                var contentViewOptions = Marionette.getOption(this, 'contentViewOptions');

                if (_.isFunction(contentViewOptions)) {
                    contentViewOptions = contentViewOptions.call(this);
                }

                var ContentView = this.getContentView();

                view = new ContentView(contentViewOptions);

                this.bindContentViewEvents(view);
            }

            return view;
        },

        bindModalViewEvents: function(view) {
            var closeOnHidden = Marionette.getOption(this, 'closeOnHidden');

            if (closeOnHidden) {
                view.on('modal:hidden', _.bind(this.closeModalOnHide, this));
            }

            view.on('modal:hidden', _.bind(this.onModalHidden, this));
            view.on('modal:shown', _.bind(this.onModalShown, this));
        },

        bindHeaderViewEvents: function() {},
        bindContentViewEvents: function() {},

        hide: function() {
            if (this.isOpened) {
                this.modalViewInstance.hide();
                this.isOpened = false;
            }
        },

        closeModalOnHide: function() {
            this.modalViewInstance.close();
            this.close();
        },

        onModalHidden: function() {},

        onModalShown: function() {},

        renderModal: function() {
            if (!this.modalViewInstance) {
                this.modalViewInstance = this.buildModalView();
                this.headerViewInstance = this.buildHeaderView();
                this.contentViewInstance = this.buildContentView();

                this.modalViewInstance.on('render', _.bind(function() {
                    this.modalViewInstance.header.show(this.headerViewInstance);
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
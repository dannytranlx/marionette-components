define([
    'jquery',
    'underscore',
    'marionette',
    'marionette-components/components/modal/modal-no-footer',
    'marionette-components/utils/errors'
], function(
    $,
    _,
    Marionette,
    ModalNoFooter,
    ErrorsUtils
) {
    return Marionette.Controller.extend({
        modal: ModalNoFooter,

        type: 'get',
        data: {},

        initialize: function() {
            this.isOpened = false;
        },

        getModal: function() {
            var modal = Marionette.getOption(this, 'modal');

            if (!modal) {
                ErrorsUtils.throwError('A `modal` must be specified', 'NoModalError');
            }

            return modal;
        },

        show: function() {
            if (!this.isOpened) {
                var type = Marionette.getOption(this, 'type');
                var data = Marionette.getOption(this, 'data');
                var url = Marionette.getOption(this, 'url');

                if (!url) {
                    ErrorsUtils.throwError('An `url` must be specified', 'NoUrlError');
                }

                $.ajax({
                    type: type,
                    url: url,
                    data: data,
                    dataType: 'html',
                    success: _.bind(function(content) {
                        var options = _.extend(this.options, {
                            contentViewOptions: {
                                content: content
                            }
                        });

                        var Modal = this.getModal();

                        this.modal = new Modal(options);

                        this.modal.show();
                        this.isOpened = true;

                    }, this)
                });
            }
        },

        hide: function() {
            if (this.isOpened && this.modal) {
                this.modal.hide();
                this.isOpened = false;
            }
        }
    });
});
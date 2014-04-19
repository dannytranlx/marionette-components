define([
    'backbone'
], function(
    Backbone
) {
    return Backbone.Model.extend({
        levels: {
            info: 'info',
            danger: 'danger',
            warning: 'warning'
        },

        types: {
            sticky: 'sticky',
            fade: 'fade'
        },

        defaults: {
            level: 'info',
            title: '',
            message: '',
            type: 'fade',
            options: {}
        }
    });
});
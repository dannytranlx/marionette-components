define([
    'backbone'
], function(
    Backbone
) {
    return Backbone.Model.extend({
        defaults: {
            level: 'info',
            title: '',
            message: '',
            type: 'fade',
            options: {}
        }
    });
});
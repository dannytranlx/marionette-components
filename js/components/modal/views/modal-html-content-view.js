define([
    'underscore',
    'marionette'
], function(
    _,
    Marionette
) {
    return Marionette.ItemView.extend({
        content: '',
        template: function() {
            return Marionette.getOption(this, 'content');
        },

        initialize: function() {
            _.bindAll(this, 'template');
        }
    });
});
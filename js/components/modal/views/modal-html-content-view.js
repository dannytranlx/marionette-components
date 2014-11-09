(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(['underscore', 'marionette'], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require('underscore'), require('backbone.marionette'));
    }
})(this, function(_, Marionette) {
    return Marionette.ItemView.extend({
        content: '',
        template: function() {
            return this.getOption('content');
        },

        initialize: function() {
            _.bindAll(this, 'template');
        }
    });
});
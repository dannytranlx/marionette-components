define([
    'underscore',
    'backbone',
    'marionette'
], function(
    _,
    Backbone,
    Marionette
) {
    return Marionette.Controller.extend({
        busPrefix: undefined,

        busEvents: {},

        constructor: function() {
            Marionette.View.prototype.constructor.apply(this, arguments);
            this.bindBusEvents();
        },

        bindBusEvents: function() {
            var busEvents = Marionette.getOption(this, 'busEvents');

            if (_.isFunction(busEvents)) {
                busEvents = busEvents.call(this);
            }

            var prefix = function(key) {
                var busPrefix = Marionette.getOption(this, 'busPrefix');

                return (busPrefix ? busPrefix + ':' : '') + key;
            };

            _.each(_.pairs(busEvents), function(pair) {
                var eventKey = pair[0];
                var functionName = pair[1];

                var eventName = prefix(eventKey);

                Backbone.on(eventName, _.bind(this[functionName], this));
            }, this);

        }
    });
});
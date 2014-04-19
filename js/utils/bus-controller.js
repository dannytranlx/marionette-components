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
            Marionette.Controller.prototype.constructor.apply(this, arguments);
            this.bindBusEvents();
        },

        bindBusEvents: function() {
            var busEvents = Marionette.getOption(this, 'busEvents');

            if (_.isFunction(busEvents)) {
                busEvents = busEvents.call(this);
            }

            var prefix = _.bind(function(key) {
                var busPrefix = Marionette.getOption(this, 'busPrefix');

                return (busPrefix ? busPrefix + ':' : '') + key;
            }, this);

            _.each(_.pairs(busEvents), function(pair) {
                var eventKey = pair[0];
                var functionName = pair[1];

                var eventName = prefix(eventKey);

                // Binds the event on the global event bus and locally.
                Backbone.on(eventName, _.bind(this[functionName], this));
                this.on(eventName, _.bind(this[functionName], this));

            }, this);

        }
    });
});
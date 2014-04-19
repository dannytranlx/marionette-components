define([
    'backbone',
    'marionette-components/components/notifier/models/notification-model'
], function(
    Backbone,
    NotificationModel
) {
    return Backbone.Collection.extend({
        model: NotificationModel
    });
});
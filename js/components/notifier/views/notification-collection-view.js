define([
    'marionette',
    'marionette-components/components/notifier/views/notification-view'
], function(
    Marionette,
    NotificationView
) {
    return Marionette.CollectionView.extend({
        className: 'mc-notifications',
        itemView: NotificationView
    });
});
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'marionette-components/utils/bus-controller',
    'marionette-components/components/notifier/collections/notification-collection',
    'marionette-components/components/notifier/views/notification-collection-view'
], function(
    $,
    _,
    Backbone,
    Marionette,
    BusController,
    NotificationCollection,
    NotificationCollectionView
) {
    return BusController.extend({
        container: 'body',

        busPrefix: 'notifier',

        busEvents: {
            notify: 'notify',
            info: 'info',
            warning: 'warning',
            danger: 'danger'
        },

        limit: 5,
        stickyTime: 5000,

        getLimit: function() {
            var limit = Marionette.getOption(this, 'limit');

            if (_.isFunction(limit)) {
                limit = limit.call(this);
            }

            return limit;
        },

        getStickyTime: function() {
            var stickyTime = Marionette.getOption(this, 'stickyTime');

            if (_.isFunction(stickyTime)) {
                stickyTime = stickyTime.call(this);
            }

            return stickyTime;
        },

        getContainer: function() {
            var container = Marionette.getOption(this, 'container');

            if (_.isFunction(container)) {
                container = container.call(this);
            }

            return $(container);
        },

        initialize: function() {
            _.bindAll(this,
                'onAddNotification',
                'onRemoveNotification',
                'onHideNotification',
                'removeNotification'
            );

            this.queue = new NotificationCollection();
            this.notifications = new NotificationCollection();

            this.view = new NotificationCollectionView({
                collection: this.notifications
            });

            this.initializeEvents();

            var container = this.getContainer();

            container.append(this.view.render().el);
        },

        initializeEvents: function() {
            this.notifications.on('add', this.onAddNotification);
            this.notifications.on('remove', this.onRemoveNotification);

            this.view.on('itemview:hide', this.onHideNotification)

        },

        notify: function(options) {
            var limit = this.getLimit();

            var collection = this.notifications.length < limit ? this.notifications : this.queue;

            collection.create(options);
        },

        info: function(options) {
            options.type = NotificationCollection.prototype.model.prototype.types.info;
            this.notify(options);
        },

        danger: function(options) {
            options.type = NotificationCollection.prototype.model.prototype.types.danger;
            this.notify(options);
        },

        warning: function(options) {
            options.type = NotificationCollection.prototype.model.prototype.types.warning;
            this.notify(options);
        },

        onAddNotification: function(notification) {
            var type = notification.get('type');

            if (type === notification.types.sticky) {
                notification.timeoutId = setTimeout(this.removeNotification, this.getStickyTime(), notification);
            }

            this.trigger('notifier:added', notification);
        },

        onRemoveNotification: function(notification) {
            var type = notification.get('type');

            if (type === notification.types.sticky) {

            }

            this.trigger('notifier:removed', notification);

            var nextNotification = this.queue.shift();

            if (nextNotification) {
                this.notifications.add(nextNotification);
            }
        },

        onHideNotification: function(childView) {
            var notification = childView.model;

            if (notification.timeoutId) {
                clearInterval(notification.timeoutId);
            }

            childView.close();
        },

        removeNotification: function(notification) {
            var view = this.view.children.findByModel(notification);
            this.onHideNotification(view);
        }
    });
});
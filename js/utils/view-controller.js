'use strict';

var Marionette = require('backbone.marionette'),
  _ = require('underscore');


module.exports = Marionette.Controller.extend({
  /**
   * Constructor to use to instantiate the view
   * Cannot be a function.
   * Can be overriden by options at instantiation.
   * @type {Function}
   */
  viewClass: Marionette.ItemView,

  /**
   * Options passed the the view on instantiation
   * Can be a function.
   * Can be overriden by options at instantiation.
   * @type {Object}
   */
  viewOptions: {},

  /**
   * Events bindings similar as what a view does with DOM Events
   * Can be a function.
   * Can be overriden by options at instantiation.
   * @type {Object}
   *
   * @example
   *
   * viewEvents: {
   *   'model:save': 'saveModel',
   *   'model:delete': 'deleteModel'
   * },
   *
   * saveModel: function(model){
   *   model.save();
   * },
   *
   * deleteModel: function(model){
   *   model.delete();
   * }
   */
  viewEvents: {},

  /**
   * Determines if the controller is destroyed when the view is.
   * Cannot be a function.
   * Can be overriden by options at instantiation.
   * @type {Boolean}
   */
  isDestroyedWithView: false,

  getViewClass: function() {
    return this.getOption('viewClass');
  },

  getViewOptions: function() {
    var options = this.getOption('viewOptions');

    if (_.isFunction(options)) {
      options = options.call(this);
    }

    return options || {};
  },

  getViewEvents: function() {
    var events = this.getOption('viewEvents');

    if (_.isFunction(events)) {
      events = events.call(this);
    }

    return events || {};
  },

  buildView: function() {
    var viewOptions = this.getViewOptions();
    var ViewClass = this.getViewClass();

    var view = new ViewClass(viewOptions);
    this.bindEvents(view);

    return view;
  },

  bindEvents: function(view) {
    this.viewEvents = this.getViewEvents();
    Marionette.bindEntityEvents(this, view, this.viewEvents);

    // replace onBindEvents if it came from the options
    this.onBindEvents = this.getOption('onBindEvents');

    // this triggers the `'bind:events'` event and calls `onBindEvents`
    this.triggerMethod('bind:events', view);
  },

  onBindEvents: function( /*view*/ ) {},

  getView: function() {
    if (!this.view || this.view.isDestroyed) {
      this.view = this.buildView();

      if (this.getOption('isDestroyedWithView')) {
        this.listenTo(this.view, 'destroy', this.destroy);
      }
    }

    return this.view;
  },

  onDestroy: function() {
    if (this.view && !this.view.isDestroyed) {
      this.view.destroy();
    }
  }
});

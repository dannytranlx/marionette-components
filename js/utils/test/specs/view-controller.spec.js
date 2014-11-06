describe.only('ViewController', function() {
  'use strict';
  var Marionette = require('backbone.marionette');
  var ViewController = require('../../view-controller');

  describe('Controller definition using extend', function() {
    var onBindEventsSpy = sinon.spy();
    var viewEventBindingSpy = sinon.spy();
    var Controller = ViewController.extend({
      viewClass: Marionette.LayoutView,
      viewOptions: {
        test: 'test'
      },

      viewEvents: {
        'trigger:event': 'triggerEventBinding'
      },

      onBindEvents: onBindEventsSpy,
      triggerEventBinding: viewEventBindingSpy
    });

    afterEach(function() {
      onBindEventsSpy.reset();
      viewEventBindingSpy.reset();
    });

    describe('#getView', function() {

      var controllerInstance,
        onBindEventsTriggerSpy = sinon.spy();

      beforeEach(function() {
        controllerInstance = new Controller();
        controllerInstance.on('bind:events', onBindEventsTriggerSpy);
      });

      afterEach(function() {
        controllerInstance.destroy();
        onBindEventsSpy.reset();
        onBindEventsTriggerSpy.reset();
      });

      it('should output an instance of the given view class', function() {
        var view = controllerInstance.getView();
        view.should.be.an.instanceof(Marionette.LayoutView);
      });

      it('should use the given view options', function() {
        var view = controllerInstance.getView();
        view.getOption('test').should.equal('test');
      });

      it('should trigger bindEvents', function() {
        var view = controllerInstance.getView();
        onBindEventsSpy.should.have.been.calledOnce;
        onBindEventsTriggerSpy.should.have.been.calledOnce;
      });
    });

    describe('#viewEvents', function() {
      var controllerInstance,
        view;

      beforeEach(function() {
        controllerInstance = new Controller();
        view = controllerInstance.getView();
      });

      afterEach(function(){
        onBindEventsSpy.reset();
        viewEventBindingSpy.reset();
        controllerInstance.destroy();
      });

      it('should call the function defined in the view events definition', function(){
        view.trigger('trigger:event');
        viewEventBindingSpy.should.have.been.calledOnce;
      });
    });

    describe('#onBindEvents', function() {
      var controllerInstance,
        onBindEventsTriggerSpy = sinon.spy();

      beforeEach(function() {
        controllerInstance = new Controller();
        controllerInstance.on('bind:events', onBindEventsTriggerSpy);
      });

      afterEach(function() {
        controllerInstance.destroy();
        onBindEventsSpy.reset();
        onBindEventsTriggerSpy.reset();
      });

      it('should trigger default bindEvents', function() {
        var view = controllerInstance.getView();
        onBindEventsSpy.should.have.been.calledOnce;
        onBindEventsTriggerSpy.should.have.been.calledOnce;
      });
    });

    describe('#destroy', function() {
      var controllerInstance,
        onDestroySpy,
        viewDestroySpy,
        view;

      beforeEach(function() {
        controllerInstance = new Controller();
        view = controllerInstance.getView();
        viewDestroySpy = sinon.spy(view, 'destroy');
        onDestroySpy = sinon.spy(controllerInstance, 'onDestroy');
      });

      afterEach(function() {
        controllerInstance.destroy();
        onDestroySpy.restore();
        viewDestroySpy.restore();
      });

      it('should call onDestroy', function() {
        controllerInstance.destroy();
        onDestroySpy.should.have.been.calledOnce;
      });

      it('should call view#destroy and destroy the view', function() {
        controllerInstance.destroy();
        viewDestroySpy.should.have.been.calledOnce;
        view.isDestroyed.should.be.true;
      });
    });

    describe('#isDestroyedWithView', function() {
      var DestroyedWithViewController = ViewController.extend({
        isDestroyedWithView: true
      });

      var controllerInstance,
        destroySpy,
        viewDestroySpy,
        view;

      beforeEach(function() {
        controllerInstance = new DestroyedWithViewController();
        destroySpy = sinon.spy(controllerInstance, 'destroy');
        view = controllerInstance.getView();
        viewDestroySpy = sinon.spy(view, 'destroy');
      });

      afterEach(function() {
        controllerInstance.destroy();
        destroySpy.restore();
        viewDestroySpy.restore();
      });

      it('should destroy the controller when destroying the view', function() {
        view.destroy();
        viewDestroySpy.should.have.been.calledOnce;
        destroySpy.should.have.been.calledOnce;
      });
    });
  });

});

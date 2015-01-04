var Controller = function (eventMediator, model, view) {
  this.eventMediator = eventMediator;
  this.model = model;
  this.view = view;

  this.initialize();
};

Controller.prototype.initialize = function () {
  this.initializeEventHandlers();
};

Controller.prototype.initializeEventHandlers = function () {
  var self = this;

  window.setInterval(function () { self.eventMediator.publish("simulator:step"); }, 10);
};

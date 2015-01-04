var Application = function (target) {
  this.eventMediator = new EventMediator(target);
  this.model = new Model(this.eventMediator);
  this.view = new View(this.eventMediator, this.model, target);
  this.controller = new Controller(this.eventMediator, this.model, this.view);

  this.initialize();
};

Application.prototype.initialize = function () {
  this.initializeEventHandlers();
};

Application.prototype.initializeEventHandlers = function () {
  var self = this;

  window.addEventListener("resize", function (event) { self.eventMediator.publish("viewPort:resize"); });
};

Application.instances = [];

Application.create = function (targetId) {
  Application.instances.push(new Application(document.getElementById(targetId)));
};

var Fov = function (eventMediator) {
  this.eventMediator = eventMediator;
  this.translate = {x: 0, y: 0};
  this.scale = 1;

  this.initialize();
};

Fov.prototype.initialize = function () {
  this.initializeEventHandlers();
};

Fov.prototype.initializeEventHandlers = function () {
  var self = this;

  this.eventMediator.subscribe("fov:translate:decrement-x", function () { self.translate.x -= 10; self.setChanged(); });
  this.eventMediator.subscribe("fov:translate:increment-x", function () { self.translate.x += 10; self.setChanged(); });
  this.eventMediator.subscribe("fov:translate:reset", function () { self.translate = {x: 0, y: 0}; self.setChanged(); });
  this.eventMediator.subscribe("fov:translate:decrement-y", function () { self.translate.y -= 10; self.setChanged(); });
  this.eventMediator.subscribe("fov:translate:increment-y", function () { self.translate.y += 10; self.setChanged(); });
  this.eventMediator.subscribe("fov:scale:decrement", function () { self.scale *= 0.5; self.setChanged(); });
  this.eventMediator.subscribe("fov:scale:reset", function () { self.scale = 1; self.setChanged(); });
  this.eventMediator.subscribe("fov:scale:increment", function () { self.scale /= 0.5; self.setChanged(); });
};

Fov.prototype.setChanged = function () {
  this.eventMediator.publish("model:change", this);
};

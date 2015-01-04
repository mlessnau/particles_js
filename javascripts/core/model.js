var Model = function (eventMediator) {
  this.eventMediator = eventMediator;
  this.fov = new Fov(this.eventMediator);
  this.particles = [];
  this.simulator = new Simulator(this.eventMediator, this.particles);
};

Model.prototype.setChanged = function () {
  this.eventMediator.publish("model:change", this);
};

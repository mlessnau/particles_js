var Model = function (eventMediator) {
  this.eventMediator = eventMediator;
  this.fov = new Fov(this.eventMediator);
};

Model.prototype.setChanged = function () {
  this.eventMediator.publish("model:change", this);
};

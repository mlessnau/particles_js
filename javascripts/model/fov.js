var Fov = function (eventMediator) {
  this.eventMediator = eventMediator;
  this.translate = vec2.create();
  this.scale = 1;

  this.initialize();
};

Fov.prototype.initialize = function () {
  this.initializeEventHandlers();
};

Fov.prototype.initializeEventHandlers = function () {
  var self = this;

  this.eventMediator.subscribe("controls:fov:translate:decrement-x", function () {
    vec2.add(self.translate, self.translate, vec2.fromValues(10 / self.scale, 0));
    self.setChanged();
  });

  this.eventMediator.subscribe("controls:fov:translate:increment-x", function () {
    vec2.sub(self.translate, self.translate, vec2.fromValues(10 / self.scale, 0));
    self.setChanged();
  });

  this.eventMediator.subscribe("controls:fov:translate:reset", function () {
    self.translate = vec2.create();
    self.setChanged();
  });

  this.eventMediator.subscribe("controls:fov:translate:decrement-y", function () {
    vec2.add(self.translate, self.translate, vec2.fromValues(0, 10 / self.scale));
    self.setChanged();
  });

  this.eventMediator.subscribe("controls:fov:translate:increment-y", function () {
    vec2.sub(self.translate, self.translate, vec2.fromValues(0, 10 / self.scale));
    self.setChanged();
  });

  this.eventMediator.subscribe("controls:fov:scale:decrement", function () {
    self.scale = self.scale / 2;
    self.setChanged();
  });

  this.eventMediator.subscribe("controls:fov:scale:reset", function () {
    self.scale = 1;
    self.setChanged();
  });

  this.eventMediator.subscribe("controls:fov:scale:increment", function () {
    self.scale = self.scale * 2;
    self.setChanged();
  });
};

Fov.prototype.setChanged = function () {
  this.eventMediator.publish("model:change", this);
};

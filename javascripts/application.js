var Application = function (target) {
  this.eventMediator = new EventMediator(target);
  this.model = new Model(this.eventMediator);
  this.view = new View(this.eventMediator, this.model, target);
  this.controller = new Controller(this.eventMediator, this.model, this.view);

  this.initialize();
};

Application.prototype.initialize = function () {
  this.initializeEventHandlers();
  this.initializeParticles();
};

Application.prototype.initializeEventHandlers = function () {
  var self = this;

  window.addEventListener("resize", function (event) { self.eventMediator.publish("viewPort:resize"); });
};

Application.prototype.initializeParticles = function () {
  var useExample = 4;

  if (useExample == 1) {
    // earth & moon
    this.model.particles.push(new Particle({x: 0, y: 0}, {x: 0, y: 0}, 12.71355, 1, "#0000ff"));
    this.model.particles.push(new Particle({x: 384.400, y: 0}, {x: 0, y: 7.25}, 3.476, 0.012301640441914964, "#aaaaaa"));
  } else if (useExample == 2) {
    this.model.particles.push(new Particle({x: 0, y: 100}, {x: 0, y: 2}, 20, 1, "#00ff00"));
    this.model.particles.push(new Particle({x: -300, y: -50}, {x: 2, y: 2}, 10, 0.5, "#0000ff"));
    this.model.particles.push(new Particle({x: 300, y: 70}, {x: -2, y: -1}, 10, 0.5, "#ff0000"));
  } else if (useExample == 3) {
    this.model.particles.push(new Particle({x: -50, y: -50}, {x: 4, y: -1}, 20, 1, "#00ff00"));
    this.model.particles.push(new Particle({x: -50, y: 50}, {x: -1, y: -4}, 20, 1, "#0000ff"));
    this.model.particles.push(new Particle({x: 50, y: 50}, {x: -4, y: 1}, 20, 1, "#ff0000"));
    this.model.particles.push(new Particle({x: 50, y: -50}, {x: 1, y: 4}, 20, 1, "#ffff00"));
  } else if (useExample == 4) {
    var i, j, n = 12;

    for (i = 0; i < n; ++i) {
      for (j = 0; j < n; ++j) {
        this.model.particles.push(new Particle({x: (i-n/2)*20, y: (j-n/2)*20}, {x: -2, y: -2}, 10, 0.5, "#00ff00"));
      }
    }

    this.model.particles.push(new Particle({x: -10000, y: -120}, {x: 200, y: 0}, 20, 2, "#ff0000"));
    this.model.particles.push(new Particle({x: -30000, y: 100}, {x: 300, y: 0}, 30, 10, "#ffff00"));
  } else if (useExample == 5) {
    var i, j, n = 12;

    for (i = 0, n = 5; i < n; ++i) {
      for (j = 0; j < n; ++j) {
        this.model.particles.push(new Particle({x: (i-n/2)*20 - 200, y: (j-n/2)*20}, {x: 0, y: 8}, 10, 0.5, "#00ff00"));
      }
    }

    for (i = 0, n = 5; i < n; ++i) {
      for (j = 0; j < n; ++j) {
        this.model.particles.push(new Particle({x: (i-n/2)*20 + 200, y: (j-n/2)*20}, {x: 0, y: -8}, 10, 0.5, "#ffff00"));
      }
    }

    this.model.particles.push(new Particle({x: -10000, y: -120}, {x: 200, y: 0}, 20, 2, "#ff0000"));
    this.model.particles.push(new Particle({x: -30000, y: 100}, {x: 300, y: 0}, 30, 4, "#0000ff"));
  }

  this.model.setChanged();
};

Application.instances = [];

Application.create = function (targetId) {
  Application.instances.push(new Application(document.getElementById(targetId)));
};

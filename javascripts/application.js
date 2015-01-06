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
    this.model.particles.push(new Particle(vec2.fromValues(0, 0), vec2.fromValues(0, 0), 12.71355, 1, "#0000ff"));
    this.model.particles.push(new Particle(vec2.fromValues(384.400, 0), vec2.fromValues(0, 7.25), 3.476, 0.012301640441914964, "#aaaaaa"));
  } else if (useExample == 2) {
    this.model.particles.push(new Particle(vec2.fromValues(0, 100), vec2.fromValues(0, 2), 20, 1, "#00ff00"));
    this.model.particles.push(new Particle(vec2.fromValues(-300, -50), vec2.fromValues(2, 2), 10, 0.5, "#0000ff"));
    this.model.particles.push(new Particle(vec2.fromValues(300, 70), vec2.fromValues(-2, -1), 10, 0.5, "#ff0000"));
  } else if (useExample == 3) {
    this.model.particles.push(new Particle(vec2.fromValues(-50, -50), vec2.fromValues(4, -1), 15, 2, "#00ff00"));
    this.model.particles.push(new Particle(vec2.fromValues(-50, 50), vec2.fromValues(-1, -4), 20, 2, "#0000ff"));
    this.model.particles.push(new Particle(vec2.fromValues(50, 50), vec2.fromValues(-4, 1), 35, 2, "#ff0000"));
    this.model.particles.push(new Particle(vec2.fromValues(50, -50), vec2.fromValues(1, 4), 30, 2, "#ffff00"));
  } else if (useExample == 4) {
    var i, j, n = 14;

    for (i = 0; i < n; ++i) {
      for (j = 0; j < n; ++j) {
        this.model.particles.push(new Particle(vec2.fromValues((i-n/2)*20, (j-n/2)*20), vec2.fromValues(-2, -2), 10, 0.5, "#00ff00"));
      }
    }

    this.model.particles.push(new Particle(vec2.fromValues(-10000, -120), vec2.fromValues(200, 0), 20, 2, "#ff0000"));
    this.model.particles.push(new Particle(vec2.fromValues(-30000, 100), vec2.fromValues(300, 0), 30, 10, "#ffff00"));
  } else if (useExample == 5) {
    var i, j, n = 12;

    for (i = 0, n = 5; i < n; ++i) {
      for (j = 0; j < n; ++j) {
        this.model.particles.push(new Particle(vec2.fromValues((i-n/2)*20 - 200, (j-n/2)*20), vec2.fromValues(0, 8), 10, 0.5, "#00ff00"));
      }
    }

    for (i = 0, n = 5; i < n; ++i) {
      for (j = 0; j < n; ++j) {
        this.model.particles.push(new Particle(vec2.fromValues((i-n/2)*20 + 200, (j-n/2)*20), vec2.fromValues(0, -8), 10, 0.5, "#ffff00"));
      }
    }

    this.model.particles.push(new Particle(vec2.fromValues(-10000, -120), vec2.fromValues(200, 0), 20, 2, "#ff0000"));
    this.model.particles.push(new Particle(vec2.fromValues(-30000, 100), vec2.fromValues(300, 0), 30, 4, "#0000ff"));
  }

  this.model.setChanged();
};

Application.instances = [];

Application.create = function (targetId) {
  Application.instances.push(new Application(document.getElementById(targetId)));
};

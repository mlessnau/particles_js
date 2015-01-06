var Simulator = function (eventMediator, particles) {
  this.eventMediator = eventMediator;
  this.particles = particles;
  this.lastStep = null;

  this.initialize();
};

Simulator.prototype.initialize = function () {
  this.initializeEventHandlers();
};

Simulator.prototype.initializeEventHandlers = function () {
  var self = this;

  this.eventMediator.subscribe("simulator:step", function (event) {
    self.step(event);
  });
};

Simulator.prototype.setChanged = function () {
  this.eventMediator.publish("model:change", this);
};

Simulator.prototype.step = function (event) {
  var i,
      j,
      f,
      dt,
      a = vec2.create(),
      currentStep = Date.now();

  if (this.lastStep) {
    dt = 0.1; //(currentStep - this.lastStep) / 1000;

    for (i in this.particles) {
      f = this.calculateGravitationalForce(i);

      vec2.scale(a, f, 1 / this.particles[i].mass);
      vec2.scaleAndAdd(this.particles[i].velocity, this.particles[i].velocity, a, dt);
      vec2.scaleAndAdd(this.particles[i].position, this.particles[i].position, this.particles[i].velocity, dt);

      // handle collisions
      for (j in this.particles) {
        if (i != j && vec2.distance(this.particles[i].position, this.particles[j].position) <= (this.particles[i].radius + this.particles[j].radius)) {
          this.simulateCollision(this.particles[i], this.particles[j]);
        }
      }
    }
  }

  this.lastStep = currentStep;
  this.setChanged();
};

Simulator.prototype.simulateCollision = function (particle1, particle2) {
  var d,
      v = vec2.create(),
      mtd = vec2.create(),
      im1 = 1 / particle1.mass,
      im2 = 1 / particle2.mass,
      angle = Math.atan2(particle2.position[1] - particle1.position[1], particle2.position[0] - particle1.position[0]),
      v1 = vec2.length(particle1.velocity),
      v2 = vec2.length(particle2.velocity),
      dir1 = Math.atan2(particle1.velocity[1], particle1.velocity[0]),
      dir2 = Math.atan2(particle2.velocity[1], particle2.velocity[0]),
      nv1 = vec2.fromValues(v1 * Math.cos(dir1 - angle), v1 * Math.sin(dir1 - angle)),
      nv2 = vec2.fromValues(v2 * Math.cos(dir2 - angle), v2 * Math.sin(dir2 - angle)),
      fv1 = vec2.fromValues(((particle1.mass - particle2.mass) * nv1[0] + 2 * particle2.mass * nv2[0]) / (particle1.mass + particle2.mass), nv1[1]),
      fv2 = vec2.fromValues((2 * particle1.mass * nv1[0] + (particle2.mass - particle1.mass) * nv2[0]) / (particle1.mass + particle2.mass), nv2[1]),
      cosAngle = Math.cos(angle),
      sinAngle = Math.sin(angle);

  particle1.velocity = vec2.fromValues(cosAngle * fv1[0] - sinAngle * fv1[1], sinAngle * fv1[0] + cosAngle * fv1[1]);
  particle2.velocity = vec2.fromValues(cosAngle * fv2[0] - sinAngle * fv2[1], sinAngle * fv2[0] + cosAngle * fv2[1]);

  vec2.sub(v, particle1.position, particle2.position);
  d = vec2.length(v);
  vec2.scale(mtd, v, (particle1.radius + particle2.radius - d) / d);
  vec2.scaleAndAdd(particle1.position, particle1.position, mtd, im1 / (im1 + im2));
  vec2.scaleAndAdd(particle2.position, particle2.position, mtd, -im2 / (im1 + im2));
};

Simulator.prototype.calculateGravitationalForce = function (particleId) {
  var i,
      d,
      G = 2000,
      r12 = vec2.create(),
      f = vec2.create();

  for (i in this.particles) {
    if (i != particleId) {
      vec2.sub(r12, this.particles[i].position, this.particles[particleId].position);

      d = Math.max(0.001, vec2.length(r12));

      vec2.sub(r12, this.particles[i].position, this.particles[particleId].position);
      vec2.scale(r12, r12, 1 / d);
      vec2.scaleAndAdd(f, f, r12, G * this.particles[particleId].mass * this.particles[i].mass / Math.pow(d, 2));
    }
  }

  return f;
};

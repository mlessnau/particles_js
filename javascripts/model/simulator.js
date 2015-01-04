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

  this.eventMediator.subscribe("simulator:step", function (event) { self.step(event); });
};

Simulator.prototype.setChanged = function () {
  this.eventMediator.publish("model:change", this);
};

Simulator.prototype.step = function (event) {
  var i,
      j,
      a,
      f,
      dt,
      currentStep = Date.now();

  if (this.lastStep) {
    dt = 0.1; //(currentStep - this.lastStep) / 1000;

    for (i in this.particles) {
      f = this.calculateGravitationalForce(i);
      a = this.calculateAcceleration(f, this.particles[i].mass);

      this.particles[i].velocity = this.calculateVelocity(this.particles[i].velocity, a, dt);
      this.particles[i].position = this.calculatePosition(this.particles[i].position, this.particles[i].velocity, dt);

      // handle collisions
      for (j in this.particles) {
        if (i != j && this.checkCollision(this.particles[i], this.particles[j])) {
          this.simulateCollision(this.particles[i], this.particles[j]);
        }
      }
    }
  }

  this.lastStep = currentStep;
  this.setChanged();
};

Simulator.prototype.simulateCollision = function (particle1, particle2) {
  var angle = Math.atan2(particle2.position.y - particle1.position.y, particle2.position.x - particle1.position.x),
      v1 = Math.sqrt(Math.pow(particle1.velocity.x, 2) + Math.pow(particle1.velocity.y, 2)),
      v2 = Math.sqrt(Math.pow(particle2.velocity.x, 2) + Math.pow(particle2.velocity.y, 2)),
      dir1 = Math.atan2(particle1.velocity.y, particle1.velocity.x),
      dir2 = Math.atan2(particle2.velocity.y, particle2.velocity.x),
      nv1 = {
        x: v1 * Math.cos(dir1 - angle),
        y: v1 * Math.sin(dir1 - angle)
      },
      nv2 = {
        x: v2 * Math.cos(dir2 - angle),
        y: v2 * Math.sin(dir2 - angle)
      },
      fv1 = {
        x: ((particle1.mass - particle2.mass) * nv1.x + 2 * particle2.mass * nv2.x) / (particle1.mass + particle2.mass),
        y: nv1.y
      },
      fv2 = {
        x: (2 * particle1.mass * nv1.x + (particle2.mass - particle1.mass) * nv2.x) / (particle1.mass + particle2.mass),
        y: nv2.y
      },
      cosAngle = Math.cos(angle),
      sinAngle = Math.sin(angle);

  particle1.velocity = {
    x: cosAngle * fv1.x - sinAngle * fv1.y,
    y: sinAngle * fv1.x + cosAngle * fv1.y
  };

  particle2.velocity = {
    x: cosAngle * fv2.x - sinAngle * fv2.y,
    y: sinAngle * fv2.x + cosAngle * fv2.y
  };

  var dPosition = {
        x: particle1.position.x - particle2.position.x,
        y: particle1.position.y - particle2.position.y
      },
      d = Math.sqrt(Math.pow(dPosition.x, 2) + Math.pow(dPosition.y, 2)),
      mtd = {
        x: dPosition.x * (((particle1.radius + particle2.radius) - d) / d),
        y: dPosition.y * (((particle1.radius + particle2.radius) - d) / d)
      },
      im1 = 1 / particle1.mass,
      im2 = 1 / particle2.mass;

  particle1.position = {
    x: particle1.position.x + mtd.x * im1 / (im1 + im2),
    y: particle1.position.y + mtd.y * im1 / (im1 + im2)
  };

  particle2.position = {
    x: particle2.position.x - mtd.x * im2 / (im1 + im2),
    y: particle2.position.y - mtd.y * im2 / (im1 + im2)
  };
};

Simulator.prototype.checkCollision = function (particle1, particle2) {
  var d = Math.sqrt(
    Math.pow(particle1.position.x - particle2.position.x, 2)
    + Math.pow(particle1.position.y - particle2.position.y, 2)
  );

  if (d <= particle1.radius + particle2.radius) {
    return true;
  }

  return false;
};

Simulator.prototype.calculateAcceleration = function (force, mass) {
  return {
    x: force.x / mass,
    y: force.y / mass
  };
};

Simulator.prototype.calculateVelocity = function (initialVelocity, acceleration, dt) {
  return {
    x: initialVelocity.x + acceleration.x * dt,
    y: initialVelocity.y + acceleration.y * dt
  };
};

Simulator.prototype.calculatePosition = function (initialPosition, velocity, dt) {
  return {
    x: initialPosition.x + velocity.x * dt,
    y: initialPosition.y + velocity.y * dt
  };
};

Simulator.prototype.calculateGravitationalForce = function (particleId) {
  var i,
      m12,
      d,
      d2,
      r12,
      G = 2000,
      f = {x: 0, y: 0};

  for (i in this.particles) {
    if (i != particleId) {
      m12 = this.particles[particleId].mass * this.particles[i].mass;
      d2 = Math.max(0.001, Math.pow(this.particles[particleId].position.x - this.particles[i].position.x, 2) + Math.pow(this.particles[particleId].position.y - this.particles[i].position.y, 2));
      d = Math.sqrt(d2);
      r12 = {
        x: (this.particles[i].position.x - this.particles[particleId].position.x) / d,
        y: (this.particles[i].position.y - this.particles[particleId].position.y) / d
      };

      f.x += G * m12 / d2 * r12.x;
      f.y += G * m12 / d2 * r12.y;
    }
  }

  return f;
};

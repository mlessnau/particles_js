var ParticleRenderer = function (view) {
  this.view = view;
  this.fov = this.view.model.fov;
  this.particles = this.view.model.particles;
};

ParticleRenderer.prototype.render = function () {
  var i,
      t = vec2.create(),
      context = this.view.getContext(),
      center = vec2.fromValues(this.view.size.width / 2, this.view.size.height / 2);

  vec2.scaleAndAdd(t, center, this.fov.translate, this.fov.scale);

  for (i in this.particles) {
    context.beginPath();
    context.fillStyle = this.particles[i].color;

    context.arc(
      t[0] + this.particles[i].position[0] * this.fov.scale,
      t[1] + this.particles[i].position[1] * this.fov.scale,
      this.particles[i].radius * this.fov.scale,
      0,
      Math.PI * 2,
      true
    );

    context.fill();
  }
};

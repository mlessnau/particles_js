var ParticleRenderer = function (view) {
  this.view = view;
  this.fov = this.view.model.fov;
  this.particles = this.view.model.particles;
};

ParticleRenderer.prototype.render = function () {
  var i,
      context = this.view.getContext(),
      center = {
        x: this.view.size.width / 2,
        y: this.view.size.height / 2
      };

  for (i in this.particles) {
    context.beginPath();
    context.fillStyle = this.particles[i].color;

    context.arc(
      center.x + (this.fov.translate.x + this.particles[i].position.x) * this.fov.scale,
      center.y + (this.fov.translate.y + this.particles[i].position.y) * this.fov.scale,
      this.particles[i].radius * this.fov.scale,
      0,
      Math.PI * 2,
      true
    );

    context.fill();
  }
};
